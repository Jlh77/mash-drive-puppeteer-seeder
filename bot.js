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
      "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div.css-view-1dbjc4n.r-bottom-1p0dtai.r-display-6koalj.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af > div > div > div > div > div:nth-child(3) > input";

    // const descField =
    //   "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div.css-view-1dbjc4n.r-bottom-1p0dtai.r-display-6koalj.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af > div > div > div > div > div:nth-child(6) > input";
    const imgField =
      "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div.css-view-1dbjc4n.r-bottom-1p0dtai.r-display-6koalj.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af > div > div > div > div > div:nth-child(2) > input";

    const uploadButton =
      "#root > div > div > div.css-view-1dbjc4n.r-flex-13awgt0 > div > div.css-view-1dbjc4n.r-bottom-1p0dtai.r-display-6koalj.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af > div > div > div > div > div:nth-child(5) > div";

    // Loop through uploading files time
    for (let i = 0, n = postData.length; i < 1; i++) {
      // Download image locally temporarily so we can upload it using the built in file input
      const image = await downloadImage(
        postData[i].image_url,
        "temp-post-image.jpg"
      );
      console.log(`Downloaded image ${postData[i].image_url}...`);
      postData[i].image_url;
      // Nav to Upload screen
      await page.waitForSelector(uploadNavButton);
      await page.screenshot({ path: "bot_images/load1.png" });
      await page.click(uploadNavButton);

      // Upload stuff area
      await page.screenshot({ path: "bot_images/load2.png" });

      await page.waitForSelector(uploadButton);
      await page.type(titleField, postData[i].title);
      await page.type(
        imgField,
        "/home/joe/northcoders/projects/mash-drive-puppeteer-seeder/temp-post-image.jpg"
      );

      await page.screenshot({ path: "bot_images/before-upload.png" });

      await page.click(uploadButton);
      console.log("Submitted...");
      // unfortunately with thjis method no programmatic  way to wait forr upload, just timeout
      console.log("Now waiting...");
      await page.screenshot({ path: "bot_images/beforewait.png" });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await page.screenshot({ path: "bot_images/afterwait.png" });
      // refresh for next loop (maybe unnecesarry)
      console.log(`Image ${i} done...`);
      await page.reload();
    }

    console.log("Finished!");
    browser.close();
  } catch (err) {
    console.log("ERR>>>>>", err, "<<<<< ERR");
  }
};

const temp = async () => {
  for (let i = 0, n = postData.length; i < n; i++) {
    const image = await downloadImage(
      postData[i].image_url,
      `temp-post-image${i}.jpg`
    );
  }
};
temp();
