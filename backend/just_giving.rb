class JustGiving
  @@app_id = '5d7d8bae'
  @@version = 'v1'

  def get_charity_categories
    [{"category" => "Animal shelters and charities", "id"=>30},{"category"=>"Arts and culture","id"=>20},{"category"=>"Children\'s charities","id"=>21},{"category"=>"Climate Change (GG Green)","id"=>202},{"category"=>"Corporate social responsibility","id"=>182},{"category"=>"Democracy and Governance","id"=>197},{"category"=>"Disability","id"=>22},{"category"=>"Economic Development","id"=>198},{"category"=>"Education","id"=>23},{"category"=>"Elderly health and care","id"=>19},{"category"=>"Environmental agencies","id"=>24},{"category"=>"Homelessness charities","id"=>26},{"category"=>"Hospices","id"=>102},{"category"=>"Human rights charities","id"=>27},{"category"=>"International aid agencies","id"=>28},{"category"=>"Medical and health charities","id"=>25},{"category"=>"Microfinance","id"=>199},{"category"=>"Religion","id"=>104},{"category"=>"Rescue charities","id"=>103},{"category"=>"Social welfare organisations","id"=>29},{"category"=>"Sports charities","id"=>105},{"category"=>"Technology","id"=>200},{"category"=>"Women and Girls","id"=>201}]
    #JSON.parse(get_http_req_as_json sprintf('https://api.justgiving.com/%s/%s/charity/categories', @@app_id, @@version))
  end

  def get_charity_ids page, pageSize
    charities_json = JSON.parse(get_charities page, pageSize)
    ids = []
    charities_json['charitySearchResults'].each { |c| ids << c['charityId'] }

    ids
  end

  def get_charities page, pageSize
    categories_json = get_charity_categories
    categories = ''
    categories_json.each {
      |c|
      unless categories.empty?
        categories << '&'
      end
      categories << 'categoryId=' + c['id'].to_s
    }

    get_http_req_as_json sprintf('https://api.justgiving.com/%s/%s/charity/search?%s&page=%s&pageSize=%s',
                                 @@app_id, @@version, categories, page, pageSize)
  end

  def get_charity_by_id(id)
    get_http_req_as_json sprintf('https://api.justgiving.com/%s/%s/charity/%s', @@app_id, @@version, id)
  end

  def get_http_req_as_json(url)
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new(uri.request_uri)
    req['Content-Type'] = 'application/json'

    resp = http.request(req)
    resp.body
  end
end