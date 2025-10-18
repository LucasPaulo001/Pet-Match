import ListPets from "@/components/ListPets/ListPets";

export default async function DogsPage(){

    return(
        <div>
            <ListPets valueDogs={false} valueCats={true} />
        </div>
    );
};