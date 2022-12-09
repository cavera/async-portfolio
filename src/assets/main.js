// import fetch from "node-fetch";

const API = "https://api.dribbble.com/v2/user";
const shotsStr = "/shots";
const dribbbleToken = "61fd6f5838e3ab997b938c45182f4dfd49d22d2fea0348243e3292b2e1af566a";

const content = null || document.getElementById("content");

const headTitle = document.querySelector("title");
const avatar = null || document.getElementById("avatar");
const description = null || document.getElementById("description");
const profileName = null || document.getElementById("profile-name");
const profileAt = null || document.getElementById("profile-at");
const twitter = null || document.getElementById("twitter");
const linkedin = null || document.getElementById("linkedin");
const github = null || document.getElementById("github");
const behance = null || document.getElementById("behance");

async function fetchData(urlApi) {
	const response = await fetch(urlApi);
	const data = await response.json();
	return data;
}

const getProfile = async () => {
	try {
		const profile = await fetchData(`${API}?access_token=${dribbbleToken}`);
		headTitle.textContent = profile.name;
		description.innerHTML = profile.bio;
		profileName.innerHTML = profile.name;
		profileAt.innerHTML = `@${profile.login}`;
		twitter.setAttribute("href", profile.links.twitter);
		linkedin.setAttribute("href", profile.links.linkedin);
		github.setAttribute("href", profile.links.github);
		behance.setAttribute("href", profile.links.behance);

		// email.setAttribute("href", profile.email);
		// web.setAttribute("href", profile.links.web);
		avatar.setAttribute("src", profile.avatar_url);
	} catch (error) {}
};

const getShots = async () => {
	try {
		const shots = await fetchData(`${API}${shotsStr}?access_token=${dribbbleToken}`);

		let view = `
      ${shots
				.map(
					(shot) => `
          <div class="group relative">
          <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${shot.images.normal}" alt="${shot.title}" class="w-full" />
              </div>
						<div class="mt-4">
							<h3 class="text-lg font-bold text-gray-700 mb-2">
              <a href="${shot.html_url}" target="_blank"><span aria-hidden="true" class="absolute inset-0"></span></a>
								${shot.title}
							</h3>
              ${shot.description}
						</div>
					</div>
      `
				)
				// .slice(0, 5)
				.join("")}
    `;
		content.innerHTML = view;
	} catch (err) {
		console.error(err);
	}
};

getProfile();
getShots();
