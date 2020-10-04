const menus = [
  {
    text: 'Home',
    link: '/admin/home',
  },
  {
    text: 'Médicos',
    link: '/admin/doctor',
  },
  {
    text: 'Agendamentos',
    link: '/admin/appointment',
  },
];

export const getLink = text => {
  const menu = menus.find(menuData => menuData.text === text);
  if (menu) return menu.link;

  return '';
};

export default menus;
