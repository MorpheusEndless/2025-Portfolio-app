// Import images directly
import genesisImg from '../../../images/Genesis Real Estate.png';
import lifestyleImg from '../../../images/Lifestyle blog design.jpeg';
import codImg from '../../../images/Call of Duty Webdesign.jpeg';
import netfleImg from '../../../images/netfle.jpg';

export const devProjects = [
  {
    id: 'genesis-real-estate',
    title: 'Genesis Real Estate',
    description: 'Genesis Real Estate — helps people buy, sell, and invest in properties...',
    image: genesisImg,   // now it's a module reference, not a string
    link: 'https://genesiss-real-estate.netlify.app/',
    category: 'DEV'
  },
  {
    id: 'lifestyle-blog',
    title: 'Lifestyle Blog',
    description: 'A modern, responsive blog design with a clean aesthetic.',
    image: lifestyleImg,
    link: '#',
    category: 'DEV'
  },
  {
    id: 'call-of-duty',
    title: 'Call of Duty Webdesign',
    description: 'A high-octane gaming landing page with immersive visuals.',
    image: codImg,
    link: '#',
    category: 'DEV'
  },
  {
    id: 'netfle',
    title: 'Netfle',
    description: 'A streaming platform UI concept with dynamic content grids.',
    image: netfleImg,
    link: '#',
    category: 'DEV'
  }
];