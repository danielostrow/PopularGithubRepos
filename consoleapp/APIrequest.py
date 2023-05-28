import requests

def format_repo_data(repo):
    owner = repo['owner']['login']
    name = repo['name']
    created_at = repo['created_at']
    return f"{owner} / {name} - {created_at}"

def get_popular_repos(organization, language='java'):
    query = f"user:{organization} language:{language}"
    url = f"https://api.github.com/search/repositories?q={query}&sort=stars&order=desc"

    repos = []
    page = 1
    per_page = 100
    while True:
        params = {'page': page, 'per_page': per_page}
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            if 'items' in data:
                repos.extend(data['items'])
                page += 1
                if len(data['items']) < per_page:
                    break
            else:
                print(f"No repositories found for organization {organization}.")
                return
        else:
            print(f"Failed to retrieve repositories for organization {organization}.")
            return

    if len(repos) > 0:
        for repo in repos:
            formatted_data = format_repo_data(repo)
            print(formatted_data)
    else:
        print(f"There are no repositories in {language} at the organization {organization}.")

def handle_user_input():
    organization = input("Enter the organization name: ")
    language = input("Enter the programming language (default: java): ")
    language = language.strip() if language.strip() else 'java'
    get_popular_repos(organization, language)

# Example usage
handle_user_input()