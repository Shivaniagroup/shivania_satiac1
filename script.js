// Enhanced JavaScript for HS Shivania Group - Mobile Responsive

// Import Bootstrap
const bootstrap = window.bootstrap

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initializeNavbar()
  initializeMobileSidebar()
  initializeSearch()
  initializeCounters()
  initializeScrollEffects()
  initializeGallery()
  initializeWhatsApp()
  initializeMobileOptimizations()
  initializeForms()
  optimizePerformance()
})

function initializeNavbar() {
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })
}

function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchBtn = document.getElementById("searchBtn")

  if (!searchInput || !searchBtn) return

  // Search functionality
  function performSearch() {
    const query = searchInput.value.toLowerCase().trim()

    if (!query) {
      showNotification("Please enter a search term", "warning")
      return
    }

    // Define search keywords and their corresponding pages
    const searchMap = {
      // Cleaning related keywords
      cleaning: "shivania-group.html",
      clean: "shivania-group.html",
      household: "shivania-group.html",
      detergent: "shivania-group.html",
      disinfectant: "shivania-group.html",
      eco: "shivania-group.html",
      shivania: "shivania-group.html",

      // Industrial related keywords
      industrial: "hs-shivania.html",
      machinery: "hs-shivania.html",
      manufacturing: "hs-shivania.html",
      equipment: "hs-shivania.html",
      technical: "hs-shivania.html",
      cnc: "hs-shivania.html",
      production: "hs-shivania.html",

      // General keywords
      about: "about.html",
      contact: "contact.html",
      home: "index.html",
      services: "index.html",
      products: "index.html",
    }

    // Find matching page
    let targetPage = null
    for (const [keyword, page] of Object.entries(searchMap)) {
      if (query.includes(keyword)) {
        targetPage = page
        break
      }
    }

    if (targetPage) {
      // Redirect to the relevant page
      window.location.href = targetPage
    } else {
      // Show no results message
      showNotification("No results found. Try searching for 'cleaning', 'industrial', 'about', or 'contact'", "info")
    }
  }

  // Search on button click
  searchBtn.addEventListener("click", performSearch)

  // Search on Enter key press
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      performSearch()
    }
  })

  // Search suggestions on input
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()

    // Simple autocomplete suggestions
    const suggestions = [
      "cleaning products",
      "industrial machinery",
      "household cleaning",
      "manufacturing equipment",
      "technical services",
      "eco-friendly solutions",
    ]

    // You could implement a dropdown here for suggestions
    // For now, we'll just update the placeholder
    if (query.length > 2) {
      const matchingSuggestion = suggestions.find((s) => s.includes(query))
      if (matchingSuggestion) {
        searchInput.setAttribute("data-suggestion", matchingSuggestion)
      }
    }
  })
}

function initializeMobileSidebar() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileSidebar = document.getElementById("mobileSidebar")
  const sidebarOverlay = document.getElementById("sidebarOverlay")
  const sidebarClose = document.getElementById("sidebarClose")

  if (!mobileMenuBtn || !mobileSidebar || !sidebarOverlay || !sidebarClose) {
    return // Elements not found, skip initialization
  }

  // Open sidebar
  mobileMenuBtn.addEventListener("click", () => {
    mobileSidebar.classList.add("active")
    sidebarOverlay.classList.add("active")
    mobileMenuBtn.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  // Close sidebar
  function closeSidebar() {
    mobileSidebar.classList.remove("active")
    sidebarOverlay.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
    document.body.style.overflow = ""
  }

  sidebarClose.addEventListener("click", closeSidebar)
  sidebarOverlay.addEventListener("click", closeSidebar)

  // Close sidebar when clicking on navigation links
  const sidebarNavLinks = document.querySelectorAll(".sidebar-nav a")
  sidebarNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(closeSidebar, 300) // Small delay for better UX
    })
  })

  // Close sidebar on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileSidebar.classList.contains("active")) {
      closeSidebar()
    }
  })
}

// Counter animation
function initializeCounters() {
  const counters = document.querySelectorAll("[data-target]")
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.getAttribute("data-target"))
        const duration = 2000 // 2 seconds
        const increment = target / (duration / 16) // 60fps
        let current = 0

        const updateCounter = () => {
          current += increment
          if (current < target) {
            counter.textContent = Math.floor(current)
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target
          }
        }

        updateCounter()
        observer.unobserve(counter)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

// Scroll effects and animations
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe cards and sections for fade-in effect
  const elements = document.querySelectorAll(".card, .feature-card, .stat-card, .gallery-item")
  elements.forEach((el) => {
    observer.observe(el)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Gallery interactions
function initializeGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1.05)"
        setTimeout(() => {
          this.style.transform = ""
        }, 150)
      }, 150)
    })
  })
}

// WhatsApp functionality
function initializeWhatsApp() {
  const whatsappBtn = document.querySelector(".whatsapp-btn")
  if (!whatsappBtn) return

  whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const phoneNumber = "919XXXXXXXXX" // Replace with actual number
    const message = "Hello! I am interested in HS Shivania Group's products and services."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  })
}

// Mobile-specific optimizations
function initializeMobileOptimizations() {
  // Touch-friendly interactions for mobile
  if ("ontouchstart" in window) {
    // Add touch class for mobile-specific styles
    document.body.classList.add("touch-device")

    // Optimize carousel for touch
    const carousel = document.querySelector("#heroCarousel, #cleaningCarousel, #industrialCarousel")
    if (carousel) {
      // Enable touch swiping
      let startX = 0
      let endX = 0

      carousel.addEventListener("touchstart", (e) => {
        startX = e.changedTouches[0].screenX
      })

      carousel.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].screenX
        handleSwipe()
      })

      function handleSwipe() {
        const threshold = 50
        const diff = startX - endX

        if (Math.abs(diff) > threshold) {
          const carouselInstance = bootstrap.Carousel.getInstance(carousel)
          if (diff > 0) {
            carouselInstance.next()
          } else {
            carouselInstance.prev()
          }
        }
      }
    }
  }

  // Optimize images for mobile
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })
  })

  // Handle orientation changes
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      window.scrollTo(0, window.scrollY)
    }, 100)
  })
}

// Form handling (for future contact forms)
function initializeForms() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(form)
      const data = Object.fromEntries(formData)

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        // Show success message
        showNotification("Message sent successfully!", "success")

        // Reset form
        form.reset()

        // Reset button
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  })
}

// Notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
    `

  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `

  document.body.appendChild(notification)

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Performance optimizations
function optimizePerformance() {
  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.remove("lazy")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Preload critical resources
  const criticalImages = [
    "/modern-business-meeting.png",
    "/placeholder-vtk49.png",
    "/industrial-machinery-manufacturing.png",
  ]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Export functions for global access
window.HSShivaniaGroup = {
  showNotification,
  debounce,
  throttle,
}

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
