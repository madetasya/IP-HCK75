const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

class NewsApiController {
  static async getNaturalDisasterNews(req, res, next) {
    try {
      const response = await newsapi.v2.everything({
        q: "bencana", 
        from: new Date(
          new Date().setDate(new Date().getDate() - 7)
        ).toISOString(),
        to: new Date().toISOString(),
        language: "id",
        sortBy: "relevancy", 
      });
      console.log(response, "==========meh");

      res.json({
        success: true,
        articles: response.articles,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch",
      });
    }
  }
}

module.exports = NewsApiController;
