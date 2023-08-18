import { AxiosResponse } from "axios";
import api from "../../services/api";
import { Product } from "../../types/Product";
import { useQuery } from "react-query";
import useConstants from "../../hooks/useConstants";

const { SET_SEARCH_CODE, SET_SEARCH_TERM, SET_PRODUCT_DETAILS } =
  useConstants();

export const setSearchTerm: any = (term: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_SEARCH_TERM,
      payload: term,
    });
  };
};

// export const setSearchResults = (results: Array<Product>) => ({
//   type: "SET_SEARCH_RESULTS",
//   payload: results,
// });

export const setSearchResults: any = (results: Array<Product>) => {
  return (dispatch: any) => {
    dispatch({
      type: "SET_SEARCH_RESULTS",
      payload: results,
    });
  };
};
export const setSearchCode: any = (code: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_SEARCH_CODE,
      payload: code,
    });
  };
};
export const searchProductByCode = (code: string) => {
  return useQuery({
    queryKey: ["shoppingLists", code],
    queryFn: () => getProductByCode(code),
    enabled: !!code,
  });
};

const getProductByCode = async (code: string) => {
  try {
    const url = `/api/v1/products/${code}`;

    // const response = await api.get(url);
    //  return response.data;
    return null;
  } catch (error: any) {
    if (error.response) {
      // Houve uma resposta HTTP do servidor
      if ((error.response as AxiosResponse).status === 204) {
        // Resposta 204 - Sem conteúdo
        console.log("Erro: resposta 204 (Sem conteúdo)");
        return null;
      } else {
        // Outro código de status de erro
        console.log(
          "Erro de conexão:",
          (error.response as AxiosResponse).status
        );
      }
    } else if (error.request) {
      // A solicitação foi feita, mas não houve resposta do servidor
      console.log("Erro de conexão: sem resposta do servidor");
    } else {
      // Ocorreu um erro durante a configuração da solicitação
      console.log(
        "Erro na configuração da solicitação:",
        (error as Error).message
      );
    }
  }
};

export const setProductDetails = (product: Product) => ({
  type: SET_PRODUCT_DETAILS,
  payload: product,
});

function dispatch(arg0: { type: string; payload: any }) {
  throw new Error("Function not implemented.");
}
