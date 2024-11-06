package finaliteration;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import junit.framework.Assert;

class iteration1st {
	private WebDriver driver;
	
	 
	 private void loadHomePage() {
	        driver.get("http://localhost:3000/");
	    }

	@BeforeEach
	void setUp() throws Exception {
		
		        driver = new ChromeDriver();
	}

	@AfterEach
	void tearDown() throws Exception {
		  if (driver != null) {
	            driver.quit();
	}
	}


	@Test
	void testNavbar() {
	    loadHomePage();
	    
	    
	    WebElement navbar = driver.findElement(By.xpath("/html/body/div/div/header")); 
	    
	    
	    List<WebElement> navLinks = navbar.findElements(By.tagName("a")); 
	    
	    
	    assertEquals(2, navLinks.size(), "Navbar should contain 2 links");
	    
	    // Verify that each link contains the expected text
	    assertEquals("Profile", navLinks.get(0).getText(), "First link should be 'Profile'");
	    assertEquals("logout", navLinks.get(1).getText(), "Second link should be 'logout'");
	}
	@Test
	void testProfileLink() {
	    loadHomePage();
	    
	    WebElement profile = driver.findElement(By.xpath("/html/body/div/div/header/nav/a"));
	    boolean checking = profile.isSelected();
	    Assert.assertFalse(checking);
	}
	@Test
	void testLogoutLink() {
	    loadHomePage();
	    
	    WebElement profile = driver.findElement(By.xpath("/html/body/div/div/header/nav/button"));
	    boolean checking = profile.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testSideBar() {
	    loadHomePage();
	    
	    WebElement sidebar = driver.findElement(By.xpath("/html/body/div/div/div/aside"));
	    boolean checking = sidebar.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testusermanagementLink() {
	    loadHomePage();
	    
	    WebElement usermanage = driver.findElement(By.xpath("/html/body/div/div/div/aside/a[1]"));
	    boolean checking = usermanage.isSelected();
	    Assert.assertNull(checking);
	}
	@Test
	void testcontentmanagementLink() {
	    loadHomePage();
	    
	    WebElement content = driver.findElement(By.xpath("/html/body/div/div/div/aside/a[2]"));
	    boolean checking = content.isSelected();
	    Assert.assertTrue(checking);
	}
	@Test
	void testmoderatormanagementLink() {
	    loadHomePage();
	    
	    WebElement moderator = driver.findElement(By.xpath("/html/body/div/div/div/aside/a[3]"));
	    boolean checking = moderator.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test 
	void testeventmanagementLink() {
	    loadHomePage();
	    
	    WebElement event = driver.findElement(By.xpath("/html/body/div/div/div/aside/a[4]"));
	    boolean checking = event.isSelected();
	    Assert.assertNull(checking);
	}
	@Test
	void testsystemchangesLink() {
	    loadHomePage();
	    
	    WebElement system = driver.findElement(By.xpath("/html/body/div/div/div/aside/a[5]"));
	    boolean checking = system.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testtable() {
	    loadHomePage();
	    
	    WebElement table = driver.findElement(By.xpath("/html/body/div/div/div/main"));
	    boolean checking = table.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testAboutlinl() {
	    loadHomePage();
	    
	    WebElement about = driver.findElement(By.xpath("/html/body/div/div/footer/div/a[1]"));
	    boolean checking = about.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testprivacy() {
	    loadHomePage();
	    
	    WebElement privacy = driver.findElement(By.xpath("/html/body/div/div/footer/div/a[2]"));
	    boolean checking = privacy.isSelected();
	    Assert.assertNull(checking);
	}
	@Test
	void testterms() {
	    loadHomePage();
	    
	    WebElement terms = driver.findElement(By.xpath("/html/body/div/div/footer/div/a[3]"));
	    boolean checking = terms.isSelected();
	    Assert.assertTrue(checking);
	}
	@Test
	void testcontactus() {
	    loadHomePage();
	    
	    WebElement contact = driver.findElement(By.xpath("/html/body/div/div/footer/div/a[4]"));
	    boolean checking = contact.isSelected();
	    Assert.assertNotNull(checking);
	}
	
	
	
}


	      