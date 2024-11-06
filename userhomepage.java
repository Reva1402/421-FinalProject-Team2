package FinalProject;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

class HomePageTests {

    WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }


    private void loadHomePage() {
        driver.get("http://localhost:3000/userhomepage"); 
    }


    @Test
    void testPageTitleDisplay() {
        loadHomePage();

        WebElement pageTitle = driver.findElement(By.tagName("h2"));
        String actualTitle = pageTitle.getText();

        String expectedTitle = "Welcome to Eventopia";
        assertEquals(expectedTitle, actualTitle, "The page title should display the correct name.");
    }


    @Test
    void testEventList() {
        loadHomePage();

        WebElement event1 = driver.findElement(By.linkText("Test Event 1"));
        WebElement event2 = driver.findElement(By.linkText("Test Event 2"));
        WebElement event3 = driver.findElement(By.linkText("Test Event 3"));

        assertTrue(event1.isDisplayed(), "Event 1 should be displayed.");
        assertTrue(event2.isDisplayed(), "Event 2 should be displayed.");
        assertTrue(event3.isDisplayed(), "Event 3 should be displayed.");
    }

    @Test
    void testLikeButton() {
        loadHomePage();

        WebElement likeButton = driver.findElement(By.xpath("//button[text()='Like']"));
        boolean isLikeButtonEnabled = likeButton.isEnabled();
        assertTrue(isLikeButtonEnabled, "Like button should be enabled.");

        likeButton.click();

        WebElement unlikeButton = driver.findElement(By.xpath("//button[text()='Unlike']"));
        boolean isUnlikeButtonEnabled = unlikeButton.isEnabled();
        assertTrue(isUnlikeButtonEnabled, "Unlike button should be enabled after liking.");
    }


    @Test
    void testLogoutButton() {
        loadHomePage();

        WebElement logoutButton = driver.findElement(By.xpath("//button[text()='Logout']"));
        logoutButton.click();


        String currentUrl = driver.getCurrentUrl();
        String expectedUrl = "http://localhost:3000/login";
        assertEquals(expectedUrl, currentUrl, "After clicking logout, the user should be redirected to the login page.");
    }


    @Test
    void testEventNavigation() {
        loadHomePage();

        WebElement eventLink = driver.findElement(By.linkText("Test Event 1"));
        eventLink.click();

        String currentUrl = driver.getCurrentUrl();
        String expectedUrl = "http://localhost:3000/events/test-event-1";
        assertEquals(expectedUrl, currentUrl, "The user should be redirected to the correct event page.");
    }


    @Test
    void testProfileNavigation() {
        loadHomePage();

        WebElement profileLink = driver.findElement(By.linkText("Profile"));
        profileLink.click();

        String currentUrl = driver.getCurrentUrl();
        String expectedUrl = "http://localhost:3000/profile";
        assertEquals(expectedUrl, currentUrl, "Clicking the 'Profile' link should navigate to the profile page.");
    }


    @Test
    void testEventReport() {
        loadHomePage();

        WebElement reportButton = driver.findElement(By.xpath("//button[text()='Report this Event']"));
        reportButton.click();


        WebElement alertMessage = driver.findElement(By.id("alert"));
        assertTrue(alertMessage.isDisplayed(), "An alert should be displayed after reporting an event.");
    }


    @Test
    void testCommentSection() {
        loadHomePage();

        WebElement commentInput = driver.findElement(By.xpath("//input[@placeholder='Add a comment...']"));
        WebElement postButton = driver.findElement(By.xpath("//button[text()='Post']"));


        commentInput.sendKeys("Great event!");
        postButton.click();

        WebElement commentText = driver.findElement(By.xpath("//li[contains(text(),'Great event!')]"));
        assertTrue(commentText.isDisplayed(), "The comment should appear in the comment list.");
    }
}
