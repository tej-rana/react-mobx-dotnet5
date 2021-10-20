using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactMobxDotnet.Domain;

namespace ReactMobxDotnet.Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    City = "Brisbane",
                    Category = "drinks",
                    Venue = "Pub"
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    City = "Sydney",
                    Category = "drinks",
                    Venue = "Casino"
                },
                new Activity
                {
                    Title = "Past Activity 3",
                    Date = DateTime.Now.AddMonths(-3),
                    Description = "Activity 3 months ago",
                    City = "Brisbane",
                    Category = "games",
                    Venue = "Casino"
                },
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}