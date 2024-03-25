document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementsByClassName("download-button")[0];

    button.addEventListener("click", async () => {
        console.log("Button Clicked");

        let URL = await document.getElementById("instagramUrl").value;

        if (!URL || URL === "") {
            return showAlert("Please provide a link to start.");
        }

        if (!instaRegex(URL)) {
            return showAlert(
                "Please provide a valid post or reel url to start downloading it."
            );
        }

        const URLType = contentType(URL);

        try {
            //Loading Animation
            const element = document.getElementById("formm");
            element.innerHTML = `
    <div class="loader">
                                <p class="text">
                                <span class="letter letter1">L</span>
                                <span class="letter letter2">o</span>
                                <span class="letter letter3">a</span>
                                <span class="letter letter4">d</span>
                                <span class="letter letter5">i</span>
                                <span class="letter letter6">n</span>
                                <span class="letter letter7">g</span>
                                <span class="letter letter8">.</span>
                                <span class="letter letter9">.</span>
                                <span class="letter letter10">.</span>
                                </p>
                              </div>
    `;

            const request = await fetch(
                `https://127.0.0.1:8800/api/instagram?url=${URL}`
            );
            const response = await request.json();
            console.log(response);

            if (request.status === 200) {
                if (URLType === "post") {
                    // reslength = total data/6
                    console.log(response.data.length);
                    const resLength = await Math.ceil(response.data.length / 6);
                    console.log(resLength);

                    const resArray = [];

                    for (let i = 0; i < resLength; i++) {
                        let button = `
                        <button class="Btn">
  <svg
    class="svgIcon"
    viewBox="0 0 384 512"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
    ></path>
  </svg>
  <span class="icon2"></span>
</button>

                        `
                        resArray.push(`<a href="${response.data[i].url}">${button}</a>`);
                    }

                    element.innerHTML = resArray.join("&nbsp;");
                } else if (URLType === "reel") {
                    //reel dont have length more than 1
                    let button = `<button class="Btn">
<svg
class="svgIcon"
viewBox="0 0 384 512"
height="1em"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
></path>
</svg>
<span class="icon2"></span>
</button>`

                    element.innerHTML = `<a href="${response.data[0].url}">${button}</a>`;
                }
            }
        } catch (e) {
            console.log(e);
            showAlert(
                "An error occurred. Please try again later and if this error continues reach out to codesuthar on Instagram."
            );
        }
    });
});

// Regex for confirming it is instagram URL or not
// instagram url example:- https://www.instagram.com/p/CustomID/ or https://www.instagram.com/reels/CustomID/ or https://www.instagram.com/reel/CustomID/ or https://www.instagram.com/stories/username/ or https://www.instagram.com/stories/customusername/ or https://www.instagram.com/stories/customusername/customid/ or https://instagram.com/p/CustomID/ or https://instagram.com/reels/CustomID/ or https://instagram.com/reel/CustomID/ or https://instagram.com/stories/customusername/ or https://instagram.com/stories/customusername/customid/

function instaRegex(url) {
    const regex =
        /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reels|reel|stories)\/[a-zA-Z0-9_-]{11}\/?$/;

    if (regex.test(url)) {
        return url;
    } else {
        const instaURLWithoutProtocol =
            /^(www\.)?instagram\.com\/(p|reels|reel|stories)\/[a-zA-Z0-9_-]{11}\/?$/;

        if (instaURLWithoutProtocol.test(url)) {
            return `https://${url}`;
        } else {
            return false;
        }
    }
}

function showAlert(string) {
    const alertElement = document.getElementById("err");
    const alertMessage = document.getElementById("alertMSG");

    alertMessage.innerHTML = string;

    alertElement.style.display = "flex";

    console.log("Alert Displayed");

    // Hide alert after 3 seconds

    setTimeout(() => {
        alertElement.style.display = "none";
    }, 3000);
}

function contentType(url) {
    if (url.includes("instagram.com/p/")) {
        return "post";
    } else if (
        url.includes("instagram.com/reels/") ||
        url.includes("instagram.com/reel/")
    ) {
        return "reel";
    } else if (url.includes("instagram.com/stories/")) {
        return "story";
    }
}
