'use strict';

/**
 * @ngdoc service
 * @name schedulerApp.scheduler
 * @description
 * # scheduler
 * Factory in the schedulerApp.
 */
angular.module('schedulerApp')
  .factory('scheduler', function () {

//入力のdeadlineはDateオブジェクトなので残り日数に変換する
function get_diff_to_now_in_day(ymd){
  var calc = new Date((+new Date(ymd)) - (+new Date()));
  var diff =Math.ceil(calc.getTime()/(86400*1000));
  return diff;
}

function Task(id, name, rest_time, spent_time, deadline_ymd, memo, complete, todaysWork){
  // var rest_hm  = rest_time;
  // var rest     = rest_hm[0]  + rest_hm[1]*60;
  // var spent_hm = spent_time.;
  // var done     = spent_hm[0] + spent_hm[1]*60;

  this.id        = id;
  this.name      = name;
  this.deadline  = get_diff_to_now_in_day(deadline_ymd); //残り日数
  this.deadline_ymd = deadline_ymd; //deadlineを計算に使うが，返すときのために退避
  this.rest      = rest_time;
  this.done      = spent_time;
  this.memo      = memo;
  this.complete  = complete;
  this.time      = 0;
  this.deadflag  = false;
  this.todaysWork= todaysWork;

  return this;
}


function TaskPvaluePair(task, pvalue) {
    this.task   = task;
    this.pvalue = pvalue;

    return this;
}

function Schedule(task, time) {
  this.task = task;
  this.time = time;
  return this;
}

//スケジューリング用の評価関数，ここをもっと洗練すれば強いAIになる
//現在は残り時間と締め切りまでの日数の比で近似している
//締め切り当日のタスクはinfになるので絶対スケジュールに入る
function evaluate (task) {
  var priority = Math.abs(task.rest / task.deadline);//minus zero対策でMath.abs
  return priority;
}


function Scheduler(time_for_task){
  this.tpp_pool      = []; //ここpriority queueにすると実行時間は有利だけど必要ないかも
  this.time_for_task = time_for_task;
  this.selected_flag = []; //flag for double count of short and priority

  //データベースからのimportに利用する
  this.add_task = function(task){
    var p_value = evaluate(task);
    var tpp      = new TaskPvaluePair(task, p_value);
    this.tpp_pool.push(tpp);
  };

  //最大３個の小タスク（30分以下のものをサジェストしてくれる）
  this.get_short_tasks = function(){
    var comp_rest = function(a,b){
      return a.rest - b.rest;
    } 
    this.tpp_pool.sort(comp_rest);

    var ans = [];
    var count = 0;
    var tpp;
    for (var i = 0; i<this.tpp_pool.length&&count<3 ; i++) {
      tpp = this.tpp_pool[i];
      if (this.selected_flag.indexOf(tpp.task.id)!=-1){ //not foundで帰ってくる-1がtrue判定なんです?
        continue;
      }
      ++count;
      if (tpp.task.rest <= 30) {
        ans.push(tpp.task);
      };
    }

    return ans;
  }


  ////// まずは今日締め切りのタスクは確実に行う，time_for_taskはその分減らす。
  //////
  ////// deadlineとrestの比からpriorityを計算してその比に基づいてtime_for_taskを分配する。
  this.scheduling = function(n_of_require_tasks){
    var count = 0;
    var res   = this.time_for_task;
    var ans   = [];

    var comp = function(a,b){
      return a.pvalue-b.pvalue;
    };
    this.tpp_pool.sort(comp);

    var task;
    var tpp;
    var semi_task_queue = []; //今日締め切りじゃないものは優先度順から必要数queueに突っ込んで，あとで時間を振り分ける

    function push_tpp(schedule,ans,selected_flag){
      selected_flag.push[schedule.task.id];
      ans.push(schedule);
    }

    //i don't like javascript
    //i don't like javascript
    //i don't like javascript
    while(tpp = this.tpp_pool.pop()){
      if(tpp.task.deadline==0){//締め切り今日のモノは今日やる
        var req_time = tpp.task.rest;
        ++count;
        if (res > req_time) {
          var schedule = new Schedule(tpp.task, req_time);
          push_tpp(schedule, ans, this.selected_flag);
          res -= req_time;
        }else{
          var schedule = new Schedule(tpp.task, res);
          push_tpp(schedule, ans, this.selected_flag);
          break;
        };
      }else if(n_of_require_tasks > count){
        var req_time = tpp.task.rest;
        ++count;
        semi_task_queue.push(tpp);
      }else{
        this.tpp_pool.push(tpp);
        break;
      };
    };

    var sum = 0;
    semi_task_queue.reverse();//なんかqueueだったはずがstackぽくpopしているのでreverseしとく
    var amari = res;
    for (var i = semi_task_queue.length - 1; i >= 0; i--) {
      sum += semi_task_queue[i].pvalue;
    };
    for (var i = 0 ; i<semi_task_queue.length&&amari>=0; i++) {
      var tpp      = semi_task_queue[i];
      var req_time = Math.ceil(((tpp.pvalue)*res/sum)/10)*10;
      if (req_time>tpp.task.rest){req_time = tpp.task.rest;}
      if (req_time>amari) {
        var schedule = new Schedule(tpp.task,amari);
        push_tpp(schedule, ans, this.selected_flag);
        break;
      };
      var schedule = new Schedule(tpp.task, req_time);
      amari -= req_time;
      push_tpp(schedule, ans, this.selected_flag);
    };

    //request数全て終えても時間が余っている場合tppから取り出してamariがなくなるまで時間をmax振り当てていく
    while(amari>0 && (tpp = this.tpp_pool.pop())){
      if(tpp.task.rest>amari){
        var schedule = new Schedule(tpp.task,amari);
        push_tpp(schedule, ans, this.selected_flag);
        break;
      };
      var schedule = new Schedule(tpp.task, tpp.task.rest);
      amari -= tpp.task.rest;
      push_tpp(schedule, ans, this.selected_flag);
    }

    return ans;
  }


  //タスク一覧の入力にはこの関数を利用する
  this.import_tasks = function(json_tasklist){
    var tasklist = json_tasklist;
    var ans      = [];
    for (var i = tasklist.length - 1; i >= 0; i--) {
      var taskhash = tasklist[i];
      // var todays_work = tasklist['todays_work'] //いらないよね？
      var id        = taskhash['id'];
      var name      = taskhash['name'];
      var rest_time = taskhash['rest_time'];
      var spent_time= taskhash['spent_time'];
      var deadline  = taskhash['deadline'];
      var memo      = taskhash['memo'];
      var complete  = taskhash['complete'];
      var todaysWork= taskhash['todaysWork'];
      var task = new Task(id, name, rest_time, spent_time, deadline, memo, complete, todaysWork);
      ans.push(task);
    };
    return ans;
  }
}

//返り値にはtimeプロパティをつける
function touch_time_property(priority_tasks){
  var ans=[];
  for (var i = priority_tasks.length - 1; i >= 0; i--) {
    var task=priority_tasks[i].task;
    task.time=priority_tasks[i].time;
    ans.push(task);
  };
  return ans;
}

//返り値にはdeadlineプロパティをつける
function touch_deadflag(priority_tasks, past_achievement){
  var ans = [];
  var coefficient = 0.7; //適当。学習データがたくさんあればここをパラメータチューニングする余地はある

  for (var i = priority_tasks.length - 1; i >= 0; i--) {
    var task = priority_tasks[i];
    var time_estimation = task.time*coefficient + mean(past_achievement)*(1-coefficient)
    if (task.rest / time_estimation > task.deadline){
      task.deadflag =true;
    }
    delete task.deadline; //内部計算用のdeadline propertyを削除
    ans.push(task)
  };
  return ans;
}

function mean(ary){
  var sum = 0;
  for (var i = ary.length - 1; i >= 0; i--) {
    sum+=ary[i];
  };
  return sum/ary.length;
}



/*
task = {
  id: int,
  name: string,
  rest_time: int-終えるのに必要な時間(min),
  spent_time: int-これまでに使った時間(min),
  deadline: date.toString(),
  memo:string,
  complete: boolean
}
*/

    // Public API here
    return {
      //外から呼び出すのはこの関数
      main: function(json_tasklist, time_for_task, n_of_require_tasks, past_achievement){
        if (!(json_tasklist)) {
          var ans={
            'priority_tasks':[],
             'short_tasks':[]
           };
          return ans;
        };
        var manager  = new Scheduler(time_for_task);

        var tasklist = manager.import_tasks(json_tasklist);
        for (var i = tasklist.length - 1; i >= 0; i--) {
          manager.add_task(tasklist[i]);
        };

        var schedule = manager.scheduling(n_of_require_tasks);
        var short_tasks = manager.get_short_tasks()
        var priority_tasks = touch_deadflag(touch_time_property(schedule), past_achievement);

        var ans = {'priority_tasks':priority_tasks, 'short_tasks':short_tasks};
        return ans;
      }
    };
  });

/*
sanple JSON
[
    {
        "complete": false,
        "deadline": "2014-11-11",
        "id": 123,
        "memo": "hoge",
        "name": "pin",
        "rest_time": 12,
        "spent_time": 123
    },
    {
        "complete": false,
        "deadline": "2014-11-11",
        "id": 234,
        "memo": "hoge",
        "name": "pin",
        "rest_time": 12,
        "spent_time": 123
    }
]
*/
