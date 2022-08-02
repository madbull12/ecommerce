export const GET_ALL_PRODUCTS = `

  query {
  products{
    data{
      attributes{
        title
        slug
        price
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

export const GET_SINGLE_PRODUCT = `
  query getProduct($slug:String!) {
    products(filters:{slug:{eq:$slug}}) {
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