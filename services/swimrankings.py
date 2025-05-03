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
    if not id:
        return None
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


def scrape_live_swimrankings():
    url = "https://live.swimrankings.net/"
    response = requests.get(url)

    soup = BeautifulSoup(response.content, 'html5lib')
    table = soup.find('table')
    rows = table.find_all('tr')
    rows.pop(0)

    entries = []
    for row in rows:
        a_date = row.find('td', class_='tdDate').find('a')

        meet_id = a_date["href"].replace("/", "")
        date = a_date.text.strip()

        course = row.find('td', class_='tdCourse').find('a').text.strip()

        city = row.find('td', class_='tdCity').find('a').text.strip()

        meet_name = row.find('td', class_='tdName').find('a').text.strip()

        entries.append([
            meet_id,
            date,
            course,
            city,
            meet_name
        ])

    return entries

def get_meat(data):
    print(data)
    url = f"https://live.swimrankings.net/{str(data[0])}"
    print(url)
    response = requests.get(url)

    soup = BeautifulSoup(response.content, 'html5lib')

    tds = soup.find("div", {"id": "header"}).find_all('tbody')[0].find_all('td')

    name = tds[0].text.strip()
    course = parse_course(tds[1].text.strip())
    location = tds[2].text.strip()
    date = parse_date(data[1])

    return [name, course, location, date]

from datetime import datetime

def parse_date(date_str):
    if ' - ' in date_str:
        first_part = date_str.split(' - ')[0].strip()
        second_part = date_str.split(' - ')[1].strip()

        if len(first_part.split()) >= 2:
            date_to_parse = first_part
        else:
            second_part_elements = second_part.split()
            if len(second_part_elements) >= 2:
                month = second_part_elements[1]
                date_to_parse = first_part + " " + month

                if len(second_part_elements) >= 3:
                    year = second_part_elements[2]
                    date_to_parse += " " + year
    else:
        date_to_parse = date_str

    parts = date_to_parse.split()

    if len(parts) == 3:
        try:
            return datetime.strptime(date_to_parse, "%d %b %Y")
        except ValueError:
            pass

    elif len(parts) == 2:
        try:
            partial_date = datetime.strptime(date_to_parse, "%d %b")

            for word in date_str.split():
                if word.isdigit() and len(word) == 4:
                    year = int(word)
                    return partial_date.replace(year=year)

            current_year = datetime.now().year
            return partial_date.replace(year=current_year)
        except ValueError:
            pass

    raise ValueError(f"Could not parse date: {date_str}")

def parse_course(course_str):
    if "25" in course_str:
        return int(25)
    elif "50" in course_str:
        return int(50)
    else:
        return int(69)
