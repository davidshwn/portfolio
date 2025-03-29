function generateExperience(name, description, created_at, html_url) {
    let clonedExperience = document.querySelector(".experience-template").cloneNode(true);
    clonedExperience.children[0].textContent = name;
    clonedExperience.children[1].textContent = created_at.split("-")[0];
    clonedExperience.children[3].textContent = description;
    clonedExperience.children[4].href = html_url;
    clonedExperience.classList.remove("experience-template");
    clonedExperience.classList.add("experience");
    document.querySelector(".experience-container").appendChild(clonedExperience);
}



async function getRepos() {
    try {
        const response = await fetch("https://api.github.com/users/davidshwn/repos");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } else {
            document.querySelector(".error").remove();
        }

        const json = await response.json();
        for (let i = json.length - 1; i >= 0; i--) {
            const repo = json[i];
            generateExperience(repo.name, repo.description, repo.created_at, repo.html_url);
        }
        
        document.querySelector(".experience-template").remove();

    } catch (error) {
        
    }
}

getRepos();