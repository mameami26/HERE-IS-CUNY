import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
import '../style/home.css';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      {/* Introduction Section */}
      <section className="tech-connect-intro">
        <div className="container text-center my-4">
          <h1>Welcome to Tech Connect CUNY</h1>
          <p>
            Tech Connect CUNY is your one-stop platform for mentorship, learning, and growth in the tech world. 
            We aim to bridge the gap between knowledge and opportunity by providing students and professionals 
            with resources to succeed.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="about-me">
        <div className="container my-4">
          <h2>About Me</h2>
          <p>
            Hello! My name is Aminata Sall, a passionate developer and lifelong learner. With a strong foundation 
            in software engineering and a dedication to empowering others, I created Tech Connect CUNY to help 
            students and professionals achieve their dreams in the tech industry.
          </p>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="future-vision">
        <div className="container my-4">
          <h2>The Future of Tech Connect CUNY</h2>
          <p>
            Our vision is to expand Tech Connect CUNY to include real-time mentorship matching, comprehensive
            learning tracks, and community-driven events. We aim to foster collaboration and innovation, ensuring 
            every student and professional has the tools and network to thrive in the tech space.
          </p>
        </div>
      </section>

      {/* Existing Functionality */}
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
