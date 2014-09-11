dest = open('many_task_case.json', 'w')

open('source.json') do |file|
	begin
		i = 1
		while line = file.readline
			i += 1 if line.include?('}')
			line.gsub!(/task/,"task#{i}")
			line.gsub!(/target/, i.to_s)
			line.gsub!(/this is/, "this is task #{i}")
			line.gsub!(/2014-08-19/,"2014-08-#{19+i/10}")
			line.gsub!(/hoge/,i.to_s)
			line.gsub!(/poyo/,i.to_s)
			dest.write(line)
		end
	rescue EOFError
	end
end
