import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


const AvailableMeals = () => {

  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  
  useEffect(() => {
    const innerFunc = async () => {
      
      const res = await axios.get("https://mealsapp-f67af-default-rtdb.firebaseio.com/meals.json")
      const response = res.data;
      const newData = [];
     

      for (const key in response) {
        newData.push({
          id: response[key],
          name: response[key].name,
          description: response[key].description,
          price: response[key].price,
        });
      }
      setMealsData(newData);
     setIsLoading(false)
    }
  
      innerFunc().catch(error=>{
      setIsLoading(false);
      
    })
  }, [])

  if (isLoading) {
    return(<h2 className={classes.isLoading}>Loading...</h2>)
  }
   
  console.log(mealsData)
  
  const mealsList = mealsData.map((mealObj,index) => (
    <MealItem
      key={mealObj.id }
      id={mealObj.id}
      name={mealObj.name}
      description={mealObj.description}
      price={mealObj.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
