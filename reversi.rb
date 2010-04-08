require 'rubygems'
require 'sinatra/base'

get '/' do
  HomePage.new.to_s
end
