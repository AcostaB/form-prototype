Figure out how to avoid importing interfaces. Seems like when it was in Definitions folder, NOT having the "export" keyword made it so they could be recognized globally. 

Typescript is not throwing errors when it should! Look into the tsconfigurations.

consider creating a hook for useNormalizedData that contains all the logic for manipulating the data. The tuple would return a function that can specify the name of the action, the name of the entity, the name of the entity being removed, and the id of the value being removed. This could use some tight typescript checking.  

create a hook for using validation. it would return multiple functions that can be used to manipulate the validation state. 
  inside the useValidationHook, I would need to use the useState to make it keep track of state. 
  BUT if I did this, then both pieces of state would be broken off, causing state to be updated multiple times. 
# Noteworthy

  App is using babel macros for styled components, CRA 2.x, typescript, react hooks.  

