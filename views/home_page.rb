require 'erector'

class HomePage < Erector::Widget
  def content
    html do
      head do
        title 'Reversi'
      end
      body do
        h2 'REVERSI'
      end
    end
  end
end