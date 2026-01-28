document.addEventListener("DOMContentLoaded", () => {

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav_links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  const navLinksList = document.querySelectorAll('.nav_links a');
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Supabase config (YOUR KEY IS CORRECT)
  const supabaseUrl = "https://jneiiwtvjahrwmmhveod.supabase.co";
  const supabaseKey = "sb_publishable_fA_Ru6CuSIbaoLfIuyDIIQ_-aAEm-cl";

  const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("Contact form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const { error } = await supabase
      .from("Contacts")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Supabase error:", error);
      alert("Failed to send message");
    } else {
      alert("Message sent successfully!");
      form.reset();
    }
  });

});

