namespace :spec do

  desc "Run rspec tests"
  task :run => ["tests:tmp"]

  namespace :tests do

    task :tmp do
      puts "*** Running tmp file ***"
      system "rspec"
    end

  end
end
