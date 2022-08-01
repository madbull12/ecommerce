export const GET_ALL_PRODUCTS = `

  query {
  products{
    data{
      attributes{
        title
        slug
        price
        description
        image{
          data{
            attributes{
              formats
            }
          }
        }
        
      }
      id
    }
  }
  }

`