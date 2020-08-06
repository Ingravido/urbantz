# Ohm Store - Proposed Solution

##Server

###Working endpoints:

 `/ohms/ohm-details/:id`
 
 Returns detail of a certain order by id
 
 `/ohms/order/:trackingId`
 
 Returns detail of a certain order by trackingId
 
 `/ohms/update-order/:trackingId`
 
 Progress order to the next step (If possible)
 
 `/ohms/conclude-order/:trackingId`
 
 Progress order to DELIVERED | REFUSED. Example payload: 
 
`{ status: 'REFUSED', comment: 'Ohm resistor with different impedance }`

###Modules created and refactors

- Lang module for internationalization.
- Db logic extracted to service and improved handler initialization to a common variable to all methods.
- Config files `/config` created to store common config

##Web

- Created new orderFinalStatus controller to handle with new textarea to supply a refusal reason.
- Added some more css entries to main.css
- Some fixes on initial tracking controller (succes/error callbacks where inverted)

##Improvements/nice to have:
- Cover with tests new logic related with order refusal text save.
- More test to cover all the edge cases and 'ugly paths'
- Nicer UI css styling (now looks like a skeleton)
- Better UX experience: 
    - After saving refusal reason page could reload or change.
    - Some order detail shown just in raw json.
    - Splits into two views with its own css file: Order details and search bar
    


 
   
