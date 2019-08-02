require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.generators do |g|
      g.stylesheets    false
      g.javascripts    false
      g.helper         false
      g.test_framework false
    end

    # デフォルト言語を日本語にする
    config.i18n.default_locale = :ja

    # carrierwaveを使えるようにする
    config.autoload_paths += Dir[Rails.root.join('app', 'uploaders')]
  end
end
