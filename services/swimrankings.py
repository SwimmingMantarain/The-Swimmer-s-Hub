import requests
from bs4 import BeautifulSoup

def get_swimmer_id(first_name, last_name):
    url = f"https://www.swimrankings.net/index.php?&internalRequest=athleteFind&athlete_clubId=-1&athlete_gender=-1&athlete_lastname={last_name}&athlete_firstname={first_name}"
    response = requests.get(url)


    try:
        soup = BeautifulSoup(response.content, 'html5lib')
        name = soup.find('td', class_='name')
        a_tag = name.find_all('a')
        href = a_tag[0]['href']
        athlete_id = href.split('=')[-1]

    except:
        athlete_id = None

    return athlete_id

def get_swimmer_pbs(id):
    url = f"https://www.swimrankings.net/index.php?page=athleteDetail&athleteId={id}"
    response = requests.get(url)
    try:
        soup = BeautifulSoup(response.content, 'html5lib')
        table = soup.find('table', class_='athleteBest')
        rows = table.find_all('tr')
        # Remove header row
        rows.pop(0)
        pbs = []
        for row in rows:
            event_name = row.find('td', class_='event').find('a').text.strip()
            course = row.find('td', class_='course').text.strip()
            time = row.find('td', class_='time').find('a').text.strip()
            date = row.find('td', class_='date').text.strip()
            city = row.find('td', class_='city').find('a').text.strip()

            pb_data = {
                'event': event_name,
                'course': course,
                'time': time,
                'date': date,
                'city': city
            }

            pbs.append(pb_data)

        return pbs
    except Exception as e:
        print(f"Error: {e}")
        return None
