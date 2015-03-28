require 'sinatra'
require 'braintree'

Braintree::Configuration.environment = :sandbox
Braintree::Configuration.merchant_id = "thp37yf88fy592rp"
Braintree::Configuration.public_key = "s9748gsdp7hr24nh"
Braintree::Configuration.private_key = "c93830fab264bbd03285dee81a9e23e6"

get "/donate/" do
  @client_token = Braintree::ClientToken.generate
  content_type :json
  {:client_token => @client_token, :client_name => 'Tan Kah Kee' }.to_json
end 