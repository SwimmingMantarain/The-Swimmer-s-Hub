from swimrankingsscraper import SwimrankingsScraper

# Instantiate a scraper
scraper = SwimrankingsScraper()

def fetch_pbs(athelete_id):
    athlete = scraper.get_athlete(athelete_id)
    pbs = athlete.list_personal_bests()
    return pbs
