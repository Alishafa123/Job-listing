import time
import requests
from datetime import datetime, timedelta
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# --- Convert "6d ago" or "1w ago" into a real date ---
def parse_relative_date(text):
    try:
        if "d" in text:
            days = int(text.strip().replace("d ago", ""))
            return (datetime.today() - timedelta(days=days)).strftime("%Y-%m-%d")
        elif "w" in text:
            weeks = int(text.strip().replace("w ago", ""))
            return (datetime.today() - timedelta(weeks=weeks)).strftime("%Y-%m-%d")
    except:
        pass
    return datetime.today().strftime("%Y-%m-%d")

# --- Setup headless Chrome ---
options = Options()
options.add_argument("--headless")
options.add_argument("--disable-gpu")
options.add_argument("--window-size=1920,1080")

driver = webdriver.Chrome(options=options)
driver.get("https://www.actuarylist.com")

# --- Wait for job cards to load ---
try:
    WebDriverWait(driver, 15).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "Job_job-card__YgDAV"))
    )
except:
    print("❌ Job cards not found.")
    driver.quit()
    exit()

job_cards = driver.find_elements(By.CLASS_NAME, "Job_job-card__YgDAV")
print(f"✅ Found {len(job_cards)} job entries\n")

for card in job_cards:
    try:
        # --- Title ---
        try:
            title_elem = card.find_element(By.CLASS_NAME, "Job_job-card__position__ic1rc")
            title = title_elem.text.replace("FEATURED", "").strip()
        except:
            title = "Untitled"

        # --- Company ---
        try:
            company = card.find_element(By.CLASS_NAME, "Job_job-card__company__7T9qY").text.strip()
        except:
            company = "Unknown Company"

        # --- Location(s) ---
        try:
            location_elems = card.find_elements(By.CSS_SELECTOR, "div.Job_job-card__locations__x1exr a")
            location = ", ".join([loc.text.strip() for loc in location_elems if loc.text.strip()])
        except:
            location = "Unknown Location"

        # --- Posting Date ---
        try:
            date_elem = card.find_element(By.CLASS_NAME, "Job_job-card__posted-on__NCZaJ")
            posting_date = parse_relative_date(date_elem.text.strip())
        except:
            posting_date = datetime.today().strftime("%Y-%m-%d")

        # --- Tags (as list) ---
        try:
            tag_elems = card.find_elements(By.CSS_SELECTOR, "div.Job_job-card__tags__zfriA a")
            tags = [tag.text.strip() for tag in tag_elems if tag.text.strip()]
        except:
            tags = []

        # --- Job Type (inferred from tags) ---
        job_type = "Full-Time"
        if any("Intern" in t for t in tags):
            job_type = "Internship"
        elif any("Part-Time" in t for t in tags):
            job_type = "Part-Time"

        # --- Payload ---
        payload = {
            "title": title,
            "company": company,
            "location": location,
            "posting_date": posting_date,
            "job_type": job_type,
            "tags": tags  # Send as list
        }

        print("Sending:", payload)

        # --- POST to backend ---
        response = requests.post("http://localhost:5000/jobs", json=payload)

        if response.status_code == 201:
            print(f"✅ Added: {title}\n")
        elif response.status_code == 409:
            print(f"⚠️ Already exists: {title}\n")
        else:
            print(f"❌ Failed to add: {title} | Status: {response.status_code}\n")

    except Exception as e:
        print(f"⚠️ Error processing job: {e}\n")

driver.quit()
