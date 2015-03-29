require 'sinatra'
require 'braintree'
require 'net/http'
require 'uri'
require 'pry'
load 'just_giving.rb'

Braintree::Configuration.environment = :sandbox
Braintree::Configuration.merchant_id = "thp37yf88fy592rp"
Braintree::Configuration.public_key = "s9748gsdp7hr24nh"
Braintree::Configuration.private_key = "c93830fab264bbd03285dee81a9e23e6"

get '/test' do
  File.read('client_test.html')
end

post "/payment" do
  result = Braintree::Transaction.sale(
    :amount => "10.00",
    :credit_card => {
      :number => "4111111111111111",
      :expiration_date => "05/2020",
      :cardholder_name => "Tan Kah Kee",
      :cvv => "231"
    }, 
    :options => {
      :submit_for_settlement => true
    }
  )
  message = 'Transaction failed, try again'
  if result.success? 
    message = 'Thank you for your donation!'
  end
  content_type :json
  {message: message}.to_json
end

get '/charity/categories/' do
  get_cache('charity_categories', JustGiving.new.get_charity_categories, 'application/json')
end

get '/charity/all/ids/' do
  JustGiving.new.get_charity_ids(1, 20).join(',')
end

get '/charity/all/' do
  page = 1
  pageSize = 20
  get_cache(sprintf('charity_all_%s_%s', page, pageSize), JustGiving.new.get_charities(page, pageSize), 'application/json')
end

get '/charity/:id/' do
  # get_cache('charity_by_id', JustGiving.new.get_charity_by_id(params[:id]), 'application/json')
  JustGiving.new.get_charity_by_id(params[:id])
end

def get_cache(id, data, type)
  cache_file = File.join("cache", id)
  if !File.exist?(cache_file) || (File.mtime(cache_file) < (Time.now - 600))
    File.open(cache_file, "w"){ |f| f << data }
  end
  send_file cache_file, :type => type
end
