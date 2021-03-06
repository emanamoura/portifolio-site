async function getRepos() {
    try {
        let githubRepositories;
        await fetch('https://api.github.com/users/emanamoura/repos') .then(response => response.json()) .then(data => { githubRepositories = data})
        return githubRepositories
    } catch(error) {
        return "Error getting repositories!"
    }
}

async function createCards() {
    const cardContainer = document.querySelector(".card-container")
    cardContainer.innerHTML = `<div class="loading">
                                <img  src="./assets/loading.gif" />
                                </div>`
    const repositories = await getRepos();
    let html = ""
    repositories.forEach(async repository => {
        const branchNumber = await getBranchsNumber(repository.name);
        html += createCardProject(repository, branchNumber);
        cardContainer.innerHTML = html;
    })   
}

async function getBranchsNumber(repositoryName) {
    try {
        let branchs;
        await fetch(`https://api.github.com/repos/emanamoura/${repositoryName}/branches`)
            .then(response => response.json())
            .then(data => {
            branchs = data;
        }
        );
        return branchs.length;
    } catch(error) {
        return "Error getting number of branchs!"
    }
}

function getStarsNumbers(repository) {
    try {
        return repository.stargazers_count;
    } catch(error) {
        return "Error getting number of star!"
    }
}

function createCardProject(repository, branchNumber) {
  
    const html = `<div class="card-project card">
                    <div class="repository-name">
                        <img src="./assets/folder.svg" alt="Folder icon">
                        <span>${repository.name}</span>
                    </div>
                    <p></p>
                    <div class="information-repository">
                        <div class="star">
                            <img src="/assets/star.svg" alt="Star icon">
                            <span>${getStarsNumbers(repository)}</span>
                        </div>
                        <div class="branch">
                            <img src="/assets/git-branch.svg" alt="Star icon">
                            <span>${branchNumber}</span>
                        </div>
                        <p>${repository.language}</p>
                    </div>
                </div>`
    return html;
}

let seeCards = document.querySelector('.see');
seeCards.addEventListener("click", createCards);