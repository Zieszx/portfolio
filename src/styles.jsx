import styled from 'styled-components';

// Color variables - using cyan theme
const colors = {
  // Main colors
  background: '#ffffff',
  default: '#272829',
  heading: '#050d18',
  accent: '#00b4d8', // Main cyan color
  surface: '#ffffff',
  contrast: '#ffffff',

  // Navigation colors
  navColor: '#a8a9b4',
  navHover: '#ffffff',
  navMobileBg: '#040b14',
  navDropdownBg: '#040b14',
  navDropdownColor: '#a8a9b4',
  navDropdownHover: '#ffffff',

  // Light backgrounds
  lightBackground: '#f4fafd',

  // Dark backgrounds
  darkBackground: '#040b14',
  darkSurface: '#151f2b',
};

// Common styled components
export const MainContent = styled.main`
  margin-left: 300px;
  padding: 20px;
  min-height: 100vh;

  @media (max-width: 1199px) {
    margin-left: 0;
    padding: 20px 15px;
  }

  &.mobile-nav-active {
    @media (max-width: 1199px) {
      margin-left: 300px;
    }
  }

  > * {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const Section = styled.section`
  padding: 60px 0;
  background-color: ${(props) => (props.lightBg ? colors.lightBackground : colors.background)};

  &.dark-background {
    background-color: ${colors.darkBackground};
    color: ${colors.contrast};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${colors.contrast};
    }
  }
`;

export const SectionTitle = styled.div`
  text-align: center;
  padding-bottom: 40px;

  h2 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
    padding-bottom: 20px;
    position: relative;
    color: ${colors.heading};

    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 50px;
      height: 3px;
      background: ${colors.accent};
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
    }
  }

  p {
    margin-bottom: 0;
    color: ${colors.default};
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 28px;
    }
  }
`;

export const StatsItem = styled.div`
  text-align: center;
  padding: 20px;

  i {
    font-size: 48px;
    color: ${colors.accent};
    margin-bottom: 15px;
    display: block;
  }

  span {
    font-size: 48px;
    font-weight: 700;
    color: ${colors.heading};
    display: block;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    color: ${colors.default};

    strong {
      color: ${colors.heading};
    }
  }
`;

export const ProgressBar = styled.div`
  margin-bottom: 20px;

  .skill {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-weight: 500;

    span {
      color: ${colors.heading};
    }

    .val {
      color: ${colors.accent};
    }
  }

  .progress-bar-wrap {
    background: #f5f5f5;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-bar {
    background: linear-gradient(90deg, ${colors.accent}, #66d9ff);
    height: 100%;
    transition: width 1.5s ease-in-out;
    border-radius: 4px;
  }
`;

export const PortfolioFilters = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 45px 0;
  text-align: center;

  li {
    cursor: pointer;
    display: inline-block;
    padding: 8px 16px 10px 16px;
    margin: 0 4px 10px 4px;
    font-size: 15px;
    font-weight: 500;
    line-height: 1;
    color: ${colors.default};
    border-radius: 50px;
    transition: all 0.3s ease;
    background: ${colors.surface};
    border: 2px solid transparent;

    &:hover,
    &.filter-active {
      color: ${colors.contrast};
      background: ${colors.accent};
      border-color: ${colors.accent};
      box-shadow: 0 4px 16px rgba(0, 180, 216, 0.3);
    }

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 6px 12px 8px 12px;
      margin: 0 2px 8px 2px;
    }
  }
`;

export const PortfolioItem = styled.div`
  margin-bottom: 30px;

  .portfolio-content {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 180, 216, 0.2);
    }

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      transition: all 0.3s ease;
    }

    .portfolio-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
      color: ${colors.contrast};
      padding: 20px;
      transform: translateY(50%);
      transition: all 0.3s ease;

      h4 {
        color: ${colors.contrast};
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
      }

      p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        margin-bottom: 8px;
      }

      .preview-link,
      .details-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: ${colors.accent};
        color: ${colors.contrast};
        border-radius: 50%;
        text-decoration: none;
        margin-right: 10px;
        margin-top: 10px;
        transition: all 0.3s ease;

        &:hover {
          background: #66d9ff;
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(0, 180, 216, 0.4);
        }
      }
    }

    &:hover .portfolio-info {
      transform: translateY(0%);
    }
  }
`;

export const AchievementItem = styled.div`
  background: ${colors.surface};
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 30px;
  border-left: 4px solid ${colors.accent};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 180, 216, 0.15);
  }

  .icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, ${colors.accent}, #66d9ff);
    color: ${colors.contrast};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-right: 20px;
    flex-shrink: 0;
    box-shadow: 0 4px 16px rgba(0, 180, 216, 0.3);
  }

  .title {
    color: ${colors.heading};
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 18px;
  }

  .period {
    color: ${colors.accent};
    font-weight: 500;
    margin-bottom: 10px;
    font-size: 14px;
  }

  .description {
    color: ${colors.default};
    margin: 0;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    .icon {
      margin: 0 auto 15px auto;
    }
  }
`;

export const ContactForm = styled.form`
  .form-control {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      border-color: ${colors.accent};
      box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.1);
    }
  }

  button[type='submit'] {
    background: linear-gradient(135deg, ${colors.accent}, #66d9ff);
    color: ${colors.contrast};
    border: none;
    border-radius: 8px;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: linear-gradient(135deg, #66d9ff, ${colors.accent});
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 180, 216, 0.3);
    }
  }
`;

export const ResumeDownloadButton = styled.button`
  background: linear-gradient(135deg, ${colors.accent}, #66d9ff);
  color: ${colors.contrast};
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(135deg, #66d9ff, ${colors.accent});
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 180, 216, 0.3);
  }

  i {
    font-size: 18px;
  }
`;

export const ScrollTop = styled.a`
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: 15px;
  z-index: 99999;
  background: ${colors.accent};
  width: 44px;
  height: 44px;
  border-radius: 50px;
  transition: all 0.4s;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &.active {
    visibility: visible;
    opacity: 1;
  }

  &:hover {
    background: #66d9ff;
    color: ${colors.contrast};
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 180, 216, 0.4);
  }

  i {
    font-size: 24px;
    color: ${colors.contrast};
    line-height: 0;
  }
`;

export const Preloader = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  overflow: hidden;
  background: ${colors.background};
  transition: all 0.6s ease-out;

  &:before {
    content: '';
    position: fixed;
    top: calc(50% - 30px);
    left: calc(50% - 30px);
    border: 6px solid #f3f3f3;
    border-top: 6px solid ${colors.accent};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: animate-preloader 1s linear infinite;
  }

  @keyframes animate-preloader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
