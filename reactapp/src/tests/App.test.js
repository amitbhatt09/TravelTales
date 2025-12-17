import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store'; // Adjust the path as necessary
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import ErrorPage from '../Components/ErrorPage';
import HomePage from '../Components/HomePage';
import TravellerViewPlace from '../TravellerComponents/TravellerViewPlace';
import ViewPlace from '../GuideComponents/ViewPlace';
import PlaceForm from '../GuideComponents/PlaceForm';
import TravellerNavbar from '../TravellerComponents/TravellerNavbar';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

jest.mock('axios');

// Setup QueryClient
const queryClient = new QueryClient();

// Common utility for rendering components with necessary providers
const renderWithProviders = (Component, props = {}) => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Component {...props} />
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

// Login Component Tests
describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Frontend_login_component_renders_with_login_heading', () => {
    renderWithProviders(Login);
    
    screen.debug(); // Debug output to see the rendered HTML

    const loginHeadings = screen.getAllByText(/Login/i);
    expect(loginHeadings.length).toBeGreaterThan(0);
  });

  test('Frontend_login_component_displays_validation_messages_with_empty_fields', () => {
    renderWithProviders(Login);

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
});

// Signup Component Tests
describe('Signup Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Frontend_signup_component_renders_with_signup_heading', () => {
    renderWithProviders(Signup);

    screen.debug(); // Debug output to see the rendered HTML

    const signupHeadings = screen.getAllByText(/Signup/i);
    expect(signupHeadings.length).toBeGreaterThan(0);
  });

  test('Frontend_signup_component_displays_validation_messages_when_submit_button_is_clicked_with_empty_fields', () => {
    renderWithProviders(Signup);

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('User Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Mobile number is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password is required')).toBeInTheDocument();
  });

  test('Frontend_signup_component_displays_error_when_passwords_do_not_match', () => {
    renderWithProviders(Signup);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});

// ErrorPage Component Tests
describe('ErrorPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Frontend_errorpage_component_renders_with_error_heading', () => {
    renderWithProviders(ErrorPage);
    
    screen.debug(); // Debug output to see the rendered HTML

    const headingElement = screen.getByText(/Oops! Something Went Wrong/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('Frontend_errorpage_component_renders_with_error_content', () => {
    renderWithProviders(ErrorPage);
    
    screen.debug(); // Debug output to see the rendered HTML

    const paragraphElement = screen.getByText(/Please try again later./i);
    expect(paragraphElement).toBeInTheDocument();
  });
});

// HomePage Component Tests
describe('HomePage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Frontend_homepage_component_renders_with_heading', () => {
    renderWithProviders(HomePage);
    
    screen.debug(); // Debug output to see the rendered HTMLu

    const headingElement = screen.getAllByText(/Travel Tales/i);
    expect(headingElement.length).toBeGreaterThan(0);
  });

  test('Frontend_homepage_component_renders_with_contact_us', () => {
    renderWithProviders(HomePage);
    
    screen.debug(); // Debug output to see the rendered HTML

    const headingElement = screen.getAllByText(/Contact Us/i);
    expect(headingElement.length).toBeGreaterThan(0);
  });
});

// TravellerViewPlace Component Tests
describe('TravellerViewPlace Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Frontend_traveller_viewplace_component_renders_with_table', () => {
    renderWithProviders(TravellerViewPlace);
    
    screen.debug(); // Debug output to see the rendered HTML

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('Frontend_traveller_viewplace_component_renders_with_logout', () => {
    renderWithProviders(TravellerViewPlace);
    
    screen.debug(); // Debug output to see the rendered HTML

    const logout = screen.getAllByText('Logout');
    expect(logout.length).toBeGreaterThan(0);
  });

  test('Frontend_traveller_viewplace_component_renders_with_heading', () => {
    renderWithProviders(TravellerViewPlace);
    
    screen.debug(); // Debug output to see the rendered HTML

    const heading = screen.getAllByText('Available Places');
    expect(heading.length).toBeGreaterThan(0);
  });
});

// TravellerNavbar Component Tests
describe('TravellerNavbar Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Frontend_traveller_navbar_component_renders_with_home', () => {
    renderWithProviders(TravellerNavbar);
    
    screen.debug(); // Debug output to see the rendered HTML

    const home = screen.getAllByText('Home');
    expect(home.length).toBeGreaterThan(0);
  });
});

// ViewPlace Component Tests
describe('ViewPlace Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Frontend_viewplace_component_renders_with_table', () => {
    renderWithProviders(ViewPlace);
    
    screen.debug(); // Debug output to see the rendered HTML

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });

  test('Frontend_viewplace_component_renders_with_logout', () => {
    renderWithProviders(ViewPlace);
    
    screen.debug(); // Debug output to see the rendered HTML

    const logout = screen.getAllByText('Logout');
    expect(logout.length).toBeGreaterThan(0);
  });

  test('Frontend_viewplace_component_renders_with_heading', () => {
    renderWithProviders(ViewPlace);
    
    screen.debug(); // Debug output to see the rendered HTML

    const heading = screen.getAllByText('Places');
    expect(heading.length).toBeGreaterThan(0);
  });
});

// PlaceForm Component Tests
describe('PlaceForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Frontend_placeform_component_displays_add_place_button', () => {
    renderWithProviders(PlaceForm);
  
    fireEvent.click(screen.getByRole('button', { name: /Add Place/i }));

 });

  test('Frontend_placeform_component_renders_with_create_new_place', () => {
    renderWithProviders(PlaceForm);
    
    screen.debug(); // Debug output to see the rendered HTML

    const place = screen.getByText('Create New Place');
    expect(place).toBeInTheDocument();
  });

  test('Frontend_placeform_component_renders_with_logout', () => {
    renderWithProviders(PlaceForm);
    
    screen.debug(); // Debug output to see the rendered HTML

    const logout = screen.getAllByText('Logout');
    expect(logout.length).toBeGreaterThan(0);
  });
});
