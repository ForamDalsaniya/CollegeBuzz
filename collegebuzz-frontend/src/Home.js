import React from 'react';
import './home.css'; 
const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to CollegeBuzz!</h1>
      <h2>Your Ultimate Destination for College Resources and Community Engagement</h2>
      <p>Discover, Connect, and Excel in Your College Journey</p>

      <div className="homepage-section">
        <h3>College Search Made Easy</h3>
        <p>
          Find your dream college with our comprehensive search tools and filters. Access detailed profiles of universities, including admission requirements, programs offered, campus life, and more. Read authentic student reviews and gain insights into college experiences from those who have been there.
        </p>
      </div>

      <div className="homepage-section">
        <h3>Test Preparation and Study Resources</h3>
        <p>
          Ace your standardized tests with our expert-guided test preparation materials. Access a wide range of study resources, including practice tests, study guides, and interactive learning tools. Get tips and strategies from successful test takers and high-achieving students.
        </p>
      </div>

      <div className="homepage-section">
        <h3>Scholarships and Financial Aid</h3>
        <p>
          Discover scholarships, grants, and financial aid opportunities to support your college education. Learn about application deadlines, eligibility criteria, and tips for maximizing your chances of receiving financial assistance. Access resources for understanding student loans and managing college expenses.
        </p>
      </div>

      {/* Continue adding more sections with respective headings and content */}

      <div className="homepage-section">
        <h3>Expert Advice and Guidance</h3>
        <p>
          Benefit from expert articles, blog posts, and videos on various college-related topics. Get personalized advice from college counselors and admissions experts. Stay updated with the latest trends and insights in the world of higher education.
        </p>
      </div>

      <div className="homepage-section">
        <h3>Start buzzing with CollegeBuzz - Your College Adventure Begins Here!</h3>
        <p>
          At CollegeBuzz, we are committed to empowering you throughout your college journey. Whether you're just starting to explore college options or navigating the challenges of campus life, we have the resources and support you need. Join our community today and embark on an exciting path towards academic and personal growth.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
