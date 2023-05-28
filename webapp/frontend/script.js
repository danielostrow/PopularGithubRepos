function search() {
  const organizationInput = document.getElementById('organization-input');
  const languageInput = document.getElementById('language-input');

  const organization = organizationInput.value;
  const language = languageInput.value || 'java';

  const url = `/get_popular_repos?organization=${organization}&language=${language}`;

  axios.get(url)
    .then((response) => {
      responseHandler(response);
    })
    .catch((error) => {
      console.log('Failed to fetch repository data.', error);
      displayErrorMessage('Failed to retrieve repository data.');
    });
}

function createTableRow(repo) {
  const tableRow = document.createElement('tr');

  const ownerCell = document.createElement('td');
  ownerCell.textContent = repo.owner;

  const nameCell = document.createElement('td');
  const nameLink = document.createElement('a');
  nameLink.textContent = repo.name;
  nameLink.href = repo.html_url;
  nameLink.target = '_blank';
  nameCell.appendChild(nameLink);

  const createdAtCell = document.createElement('td');
  createdAtCell.textContent = repo.createdAt;

  const starsCell = document.createElement('td');
  starsCell.textContent = repo.stars;

  const forksCell = document.createElement('td');
  forksCell.textContent = repo.forks;

  tableRow.appendChild(ownerCell);
  tableRow.appendChild(nameCell);
  tableRow.appendChild(createdAtCell);
  tableRow.appendChild(starsCell);
  tableRow.appendChild(forksCell);

  return tableRow;
}

function responseHandler(response) {
  if (response.status === 200) {
    const repos = response.data;
    const tableBody = document.getElementById('table-body');

    tableBody.innerHTML = '';

    if (repos.length > 0) {
      repos.forEach((repo) => {
        const row = createTableRow(repo);
        tableBody.appendChild(row);
      });
    } else {
      displayErrorMessage('No repositories found for the organization.');
    }
  } else {
    console.log('Failed to fetch repository data.');
    displayErrorMessage('Failed to retrieve repository data.');
  }
}

function displayErrorMessage(message) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  const errorMessageRow = document.createElement('tr');
  const errorMessageCell = document.createElement('td');
  errorMessageCell.colSpan = 3;
  errorMessageCell.classList.add('error-message');
  errorMessageCell.textContent = message;
  errorMessageRow.appendChild(errorMessageCell);

  tableBody.appendChild(errorMessageRow);
}

document.getElementById('search-button').addEventListener('click', search);
