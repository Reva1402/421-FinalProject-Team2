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

class iterationistpart2Test {


	private WebDriver driver;
	
	 
	 private void loadusermanagementPage() {
	        driver.get("http://localhost:3000/users");
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
		loadusermanagementPage();
	    
	    
	    WebElement navbar = driver.findElement(By.xpath("/html/body/div/div/header")); 
	    
	    
	    List<WebElement> navLinks = navbar.findElements(By.tagName("a")); 
	    
	    
	    assertEquals(2, navLinks.size(), "Navbar should contain 2 links");
	    
	    
	    assertEquals("Profile", navLinks.get(0).getText(), "First link should be 'Profile'");
	    assertEquals("logout", navLinks.get(1).getText(), "Second link should be 'logout'");
	}
	@Test
	void testProfileLink() {
		loadusermanagementPage();
	    
	    WebElement profile = driver.findElement(By.xpath("/html/body/div/div/header/nav/a"));
	    boolean checking = profile.isSelected();
	    Assert.assertFalse(checking);
	}
	@Test
	void testLogoutLink() {
		loadusermanagementPage ();
	    
	    WebElement profile = driver.findElement(By.xpath("/html/body/div/div/header/nav/button"));
	    boolean checking = profile.isSelected();
	    Assert.assertNotNull(checking);
	}
	
	@Test
	void testtable() {
		loadusermanagementPage();
	    
	    WebElement table = driver.findElement(By.xpath("/html/body/div/div/div"));
	    boolean checking = table.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testViewButton() {
		loadusermanagementPage();
	    
	    WebElement view = driver.findElement(By.xpath("/html/body/div/div/div/table/tbody/tr[3]/td[3]/button[1]"));
	    boolean checking = view.isSelected();
	}
	   
	@Test
	void testeditbutton() {
		loadusermanagementPage();
	    
	    WebElement edit = driver.findElement(By.xpath("/html/body/div/div/div/table/tbody/tr[1]/td[3]/button[2]"));
	    boolean checking = edit.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testsuspendbutton() {
		loadusermanagementPage();
	    
	    WebElement suspend = driver.findElement(By.xpath("/html/body/div/div/div/table/tbody/tr[1]/td[3]/button[3]"));
	    boolean checking = suspend.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testdeletebutton() {
		loadusermanagementPage();
	    
	    WebElement delete = driver.findElement(By.xpath("/html/body/div/div/div/table/tbody/tr[1]/td[3]/button[4]"));
	    boolean checking = delete.isSelected();
	    Assert.assertTrue(checking);
	}
	@Test
	void testaddlink() {
		loadusermanagementPage();
	    
	    WebElement add = driver.findElement(By.xpath("/html/body/div/div/div/p"));
	    boolean checking = add.isSelected();
	    Assert.assertNull(checking);
	}
	@Test
	void testAboutlinl() {
		loadusermanagementPage();
	    
	    WebElement about = driver.findElement(By.xpath("/html/body/div/div/footer/div/a[1]"));
	    boolean checking = about.isSelected();
	    Assert.assertNotNull(checking);
	}
	@Test
	void testprivacy() {
		loadusermanagementPage();
	    
	    WebElement privacy = driver.findElement(By.xpath("/html/body/div/div/footer/div/a[2]"));
	    boolean checking = privacy.isSelected();
	    Assert.assertNull(checking);
	}
	@Test
	void testterms() {
		loadusermanagementPage();
	    
	    WebElement terms = driver.findElement(By.xpath("/html/body/div/div/footer/div/a[3]"));
	    boolean checking = terms.isSelected();
	    Assert.assertTrue(checking);
	}
	@Test
	void testcontactus() {
		loadusermanagementPage();
	    
	    WebElement contact = driver.findElement(By.xpath("/html/body/div/div/footer/div/a[4]"));
	    boolean checking = contact.isSelected();
	    Assert.assertNotNull(checking);
	}
	
}