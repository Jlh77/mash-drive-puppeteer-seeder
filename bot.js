const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const postData = require("./postData.json");
const downloadImage = require("./downloadImage");

const runSeed = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 400, height: 800 },
    });
    const page = await browser.newPage();

    await page.goto("http://localhost:19006");

    // Selector setting
    const loginButton =
      "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div > div > div > div > div > div:nth-child(4) > div";
    const emailField =
      "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div > div > div > div > div > div:nth-child(2) > input";
    const passwordField =
      "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div > div > div > div > div > div:nth-child(3) > input";

    // Authenticate
    console.log("Logging in...");

    await page.waitForSelector(loginButton);
    await page.type(emailField, "theconcocter@gmail.com");
    await page.type(passwordField, "password");

    await page.screenshot({ path: "bot_images/auth.png" });

    await page.click(loginButton);

    await page.screenshot({ path: "bot_images/loggedin.png" });
    console.log("Successfully Logged in, navigating to upload screen...");

    // Set fields for stuff
    const uploadNavButton =
      "#root > div > div > div.css-view-1dbjc4n.r-display-6koalj.r-flexDirection-18u37iz.r-padding-edyy15 > div:nth-child(3)";

    const titleField =
      "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div.css-view-1dbjc4n.r-bottom-1p0dtai.r-display-6koalj.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af > div > div > div > div > div:nth-child(4) > input";

    const descField =
      "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div.css-view-1dbjc4n.r-bottom-1p0dtai.r-display-6koalj.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af > div > div > div > div > div:nth-child(5) > input";

    // Loop through uploading files time
    for (let i = 0, n = postData.length; i < n; i++) {
      // Download image locally temporarily so we can upload it using the built in file input
      const image = await downloadImage(
        postData[i].image_url,
        "temp-post-image.jpg"
      );
      console.log("Downloaded image...");
      // Nav to Upload screen
      await page.waitForSelector(uploadNavButton);
      await page.screenshot({ path: "bot_images/load1.png" });
      await page.click(uploadNavButton);

      // Upload stuff area
      await page.click(
        "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div.css-view-1dbjc4n.r-bottom-1p0dtai.r-display-6koalj.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af > div > div > div > div > div.css-cursor-18t94o4.css-view-1dbjc4n.r-backgroundColor-14sbq61.r-borderRadius-1jkafct.r-cursor-1loqt21.r-touchAction-1otgn73.r-transitionProperty-1i6wzkk.r-userSelect-lrvibr"
      );
      await page.screenshot({ path: "bot_images/load2.png" });

      await page.waitForSelector(
        "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div.css-view-1dbjc4n.r-bottom-1p0dtai.r-display-6koalj.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af > div > div > div > div > div.css-cursor-18t94o4.css-view-1dbjc4n.r-backgroundColor-14sbq61.r-borderRadius-1jkafct.r-cursor-1loqt21.r-touchAction-1otgn73.r-transitionProperty-1i6wzkk.r-userSelect-lrvibr"
      );
      await page.type(titleField, postData[i].title);
      await page.type(descField, postData[i].description);

      await page.screenshot({ path: "bot_images/before-upload.png" });
      // refresh for next loop (maybe unnecesarry)
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    }

    console.log("Finished!");
    browser.close();
  } catch (err) {
    console.log("ERR>>>>>", err, "<<<<< ERR");
  }
};
runSeed();
