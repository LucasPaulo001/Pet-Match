import ListPets from "@/components/ListPets/ListPets";

export default function DogsPage(){

    return(
        <div>
            <ListPets valueDogs={false} valueCats={true} />
        </div>
    );
};