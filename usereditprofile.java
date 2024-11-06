package FinalProject;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

class UserEditProfileTests {

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


    private void loadUserEditProfilePage() {
        driver.get("http://localhost:3000/UserEditProfile"); 
    }

    @Test
    void testPageTitleDisplay() {
        loadUserEditProfilePage();

        WebElement pageTitle = driver.findElement(By.tagName("h2"));
        String actualTitle = pageTitle.getText();

        String expectedTitle = "Edit Profile";
        assertEquals(expectedTitle, actualTitle, "The page title should display 'Edit Profile'.");
    }


    @Test
    void testProfileFields() {
        loadUserEditProfilePage();


        WebElement displayNameField = driver.findElement(By.id("displayName"));
        WebElement emailField = driver.findElement(By.id("email"));
        WebElement phoneNumberField = driver.findElement(By.id("phoneNumber"));
        WebElement addressField = driver.findElement(By.id("address"));

        assertTrue(displayNameField.isDisplayed(), "Display Name field should be displayed.");
        assertTrue(emailField.isDisplayed(), "Email field should be displayed.");
        assertTrue(phoneNumberField.isDisplayed(), "Phone Number field should be displayed.");
        assertTrue(addressField.isDisplayed(), "Address field should be displayed.");
    }


    @Test
    void testPreFilledUserData() {
        loadUserEditProfilePage();

        WebElement displayNameField = driver.findElement(By.id("displayName"));
        WebElement emailField = driver.findElement(By.id("email"));
        WebElement phoneNumberField = driver.findElement(By.id("phoneNumber"));
        WebElement addressField = driver.findElement(By.id("address"));

        assertEquals("John Doe", displayNameField.getAttribute("value"), "Display Name should be pre-filled.");
        assertEquals("john.doe@example.com", emailField.getAttribute("value"), "Email should be pre-filled.");
        assertEquals("123-456-7890", phoneNumberField.getAttribute("value"), "Phone Number should be pre-filled.");
        assertEquals("123 Main St", addressField.getAttribute("value"), "Address should be pre-filled.");
    }


    @Test
    void testProfileUpdateSuccess() {
        loadUserEditProfilePage();

        WebElement displayNameField = driver.findElement(By.id("displayName"));
        WebElement phoneNumberField = driver.findElement(By.id("phoneNumber"));
        WebElement addressField = driver.findElement(By.id("address"));
        WebElement submitButton = driver.findElement(By.xpath("//button[text()='Update Profile']"));


        displayNameField.clear();
        displayNameField.sendKeys("Jane Doe");

        phoneNumberField.clear();
        phoneNumberField.sendKeys("987-654-3210");

        addressField.clear();
        addressField.sendKeys("456 Oak St");

        submitButton.click();


        WebElement successPopup = driver.findElement(By.className("popup"));
        assertTrue(successPopup.isDisplayed(), "The success popup should be displayed after profile update.");
    }


    @Test
    void testLogoutButton() {
        loadUserEditProfilePage();

        WebElement logoutButton = driver.findElement(By.xpath("//button[text()='Logout']"));
        logoutButton.click();

        String currentUrl = driver.getCurrentUrl();
        String expectedUrl = "http://localhost:3000/login";
        assertEquals(expectedUrl, currentUrl, "After clicking logout, the user should be redirected to the login page.");
    }

    @Test
    void testLoginLinkNavigation() {
        loadUserEditProfilePage();

        WebElement loginLink = driver.findElement(By.linkText("Login"));
        loginLink.click();


        String currentUrl = driver.getCurrentUrl();
        String expectedUrl = "http://localhost:3000/login";
        assertEquals(expectedUrl, currentUrl, "Clicking 'Login' should navigate to the login page.");
    }


    @Test
    void testProfileUpdateError() {
        loadUserEditProfilePage();

        WebElement displayNameField = driver.findElement(By.id("displayName"));
        WebElement submitButton = driver.findElement(By.xpath("//button[text()='Update Profile']"));


        displayNameField.clear();
        submitButton.click();


        WebElement errorMessage = driver.findElement(By.className("error"));
        assertTrue(errorMessage.isDisplayed(), "An error message should be displayed when the profile update fails.");
    }


    @Test
    void testProfileNavigation() {
        loadUserEditProfilePage();

        WebElement profileLink = driver.findElement(By.linkText("Profile"));
        profileLink.click();

        String currentUrl = driver.getCurrentUrl();
        String expectedUrl = "http://localhost:3000/profile";
        assertEquals(expectedUrl, currentUrl, "Clicking 'Profile' should navigate to the profile page.");
    }
}
