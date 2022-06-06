export const headerLinks = [
    {
        title: "لوحة التحكم",
        href: "/dashboard",
        admin: true
    },
    {
        title: "تواصل معي",
        href: "/contact-me",
        admin: false
    },
    {
        title: "لماذا انا",
        href: "#whyme",
        admin: false
    },
    {
        title: "الاعمال",
        href: "#projects",
        admin: false

    },
    {
        title: "الصفحة الرئيسية",
        href: "#home",
        admin: false

    },
];
export const adminLinks = [
    {
        title:"اضف مشروع",
        href:"/projects/add"
    },
    {
        title:"العملاء المحتملين",
        href:"/clients/potential",
    },
    {
        title:"عملاء تم مراستلهم",
        href:"/clients/answered",
    },
]
export const carouselResponsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1  // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};
export const whyMeFutures = [
    {
      title: "خطوة بخطوة",
      why: "اول مرة تقوم بطلب موقع؟ حظيت بتجربة سيئة من قبل؟ لا تقلق سوف امر بك خطوة بخطوة في العملية من التصميم الى البرمجة ثم الى رفع موقعك ",
      svg: "steps.svg"
    },
    {
      title: "حسب الطلب",
      why: "من ناحية التصميم, الميزات, و الوظائف سوف يكون موقعك مفصل خصيصا لك",
      svg: "custom.svg"
    },
    {
      title: "موعد التسليم",
      why: "واحد من اهم الامور في العمل بالنسبة لي هي المواعيد والالتزام بيها. تاكد انني لن افوته",
      svg: "dead-line.svg"
    },
  ]