require 'rubygems'
require 'haml'
require 'sinatra/base'

class App < Sinatra::Base
  get '/' do
    haml :index
  end
  
  # Start the server if ruby file executed directly
  run! if app_file == $0
end