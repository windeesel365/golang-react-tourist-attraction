package main

import (
	"net/http"
	"regexp"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/windeesel365/golang-react-tourist-attraction/data"
)

type Trip struct {
	Title       string   `json:"title"`
	EID         string   `json:"eid"`
	URL         string   `json:"url"`
	Description string   `json:"description"`
	Photos      []string `json:"photos"`
	Tags        []string `json:"tags"`
}

func main() {
	e := echo.New()

	//middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))

	//routes
	e.GET("/", helloWorld)
	e.GET("/trips", getTrips)

	//start server   port 4001
	e.Logger.Fatal(e.Start(":4001"))

}

func helloWorld(c echo.Context) error {
	return c.String(http.StatusOK, "Hello World!")
}

func getTrips(c echo.Context) error {
	keywords := c.QueryParam("keywords")
	if keywords == "" {
		//return all trips ถ้าไม่มี keywordsใดๆที่ตรงกับข้อความแต่ละรายการเลย
		return c.JSON(http.StatusOK, map[string]interface{}{"data": data.Trips})
	}

	// regex pattern จาก keywords  split ด้วย space
	pattern := strings.ReplaceAll(keywords, " ", "|")
	regex, err := regexp.Compile("(?i)" + pattern)
	if err != nil {
		//handle regex compilation error
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"error": "invalid regex pattern"})
	}

	var results []Trip
	for _, trip := range data.Trips {
		if regex.MatchString(trip.Title) || regex.MatchString(trip.Description) || matchTags(regex, trip.Tags) {
			localTrip := Trip{ //เพื่อ convert data.Trip เป็น Trip
				Title:       trip.Title,
				EID:         trip.EID,
				URL:         trip.URL,
				Description: trip.Description,
				Photos:      trip.Photos,
				Tags:        trip.Tags,
			}
			results = append(results, localTrip)
		}
	}

	return c.JSON(http.StatusOK, map[string]interface{}{"data": results})
}

func matchTags(regex *regexp.Regexp, tags []string) bool {
	for _, tag := range tags {
		if regex.MatchString(tag) {
			return true
		}
	}
	return false
}
