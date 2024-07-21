export default interface IRoute {
    path:string;
    name:string;
    // exact:boolean;
    component:string | React.ReactNode;
    //component: React.FC;

    props?:any;
    params?: Array<Param>;
    hide?: boolean;

} 

export interface Param {
    id: string;
    value: string;
}
