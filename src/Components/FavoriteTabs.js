import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { MenuBook } from '@styled-icons/material/MenuBook';
import { Favorite } from '@styled-icons/material/Favorite';

const FavoriteTabs = ({ handleChangeTab }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleChangeTab(newValue);
    console.log(newValue);
  };

  return <div>
      <Tabs
        value={value}
        centered
        onChange={handleChange}
        sx={{marginTop: '30px'}}
        textColor="secondary"
        textColor="secondary"
        indicatorColor="secondary" >
          <Tab icon={<MenuBook />}  iconPosition="start" label="Ver todos"/>
          <Tab icon={<Favorite/>}  iconPosition="start" label="Meus favoritos"/>
      </Tabs>
  </div>;
};

export default FavoriteTabs;
