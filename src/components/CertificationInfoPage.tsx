import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Stamp, 
  BookOpen, 
  Briefcase, 
  Award, 
  Video, 
  FileText, 
  ChevronDown, 
  GraduationCap, 
  Store, 
  ShoppingBag, 
  Building2,
  Palette,
  UserCheck
} from 'lucide-react';

interface CertificationInfoPageProps {
  t: (ko: string, en: string) => string;
  setShowCertModal: (show: boolean) => void;
  setSelectedCert: (cert: string) => void;
}

const CertificationInfoPage: React.FC<CertificationInfoPageProps> = ({ t, setShowCertModal, setSelectedCert }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);

  const testimonials = [
    {
      name: "김*진",
      role: t("1급 자격증", "Level 1 Certified"),
      content: t("초기 창업 비용이 비교적 적어서 시작해보고 싶다는 마음은 있었지만, 막상 무엇부터 준비해야 할지 막막했습니다. 처음에는 협회에서 연결해 준 작은 행사부터 참여했는데, 그 경험이 쌓이면서 지금은 제가 직접 기관에 제안서를 보내고 프로그램을 운영하고 있습니다. 혼자 시작했을 때보다 훨씬 체계적으로 방향을 잡을 수 있다고 생각해 만족합니다!", "I wanted to start because the initial startup cost was relatively low, but I was at a loss as to what to prepare first. At first, I participated in small events connected by the association, and as that experience accumulated, I am now sending proposals directly to institutions and running programs. I am satisfied because I think I can set the direction much more systematically than when I started alone!"),
    },
    {
      name: "조*자",
      role: t("1급 자격증", "Level 1 Certified"),
      content: t("아이를 키우며 경력이 끊긴 뒤, 저도 다시 제 일을 해보고 싶다는 마음으로 시작했어요. 처음에는 아이들 학원비 정도만 보탤 수 있어도 좋겠다고 생각했는데, 지금은 꾸준히 수업과 체험을 운영하면서 제 일에 대한 자신감도 많이 생겼고 무엇보다 시간과 공간의 제약을 비교적 덜 받으면서 활동할 수 있다는 점이 큰 장점이었습니다. 자격증이 있으니 기관이나 학부모에게 프로그램을 소개할 때도 조금 더 신뢰 있게 설명할 수 있어요!", "After my career was interrupted while raising a child, I started with the desire to do my own work again. At first, I thought it would be good if I could just add enough for my children's academy fees, but now, as I steadily run classes and experiences, I have gained a lot of confidence in my work, and above all, the biggest advantage is that I can work with relatively fewer time and space constraints. Having a certification allows me to explain programs more reliably when introducing them to institutions or parents!"),
    },
    {
      name: "남*희",
      role: t("2급 자격증", "Level 2 Certified"),
      content: t("기존에 공방을 운영하면서 새로운 클래스를 추가하고 싶어 스탬프제작지도사 과정을 수강하게 되었습니다. 단순히 자격증 취득에 그치는 과정이 아니라, 실제 수업에서 어떻게 설명하고 어떤 방식으로 진행해야 하는 지까지 배울 수 있어서 만족도가 높았습니다. 이론보다 실무에 바로 연결되는 점이 특히 좋았습니다.", "I took the stamp making instructor course because I wanted to add a new class while running an existing workshop. It was not just a course that ended with obtaining a certification, but I was highly satisfied because I could learn how to explain and how to proceed in actual classes. The fact that it was directly connected to practice rather than theory was especially good."),
    },
    {
      name: "김*영",
      role: t("1급 자격증", "Level 1 Certified"),
      content: t("문화센터나 외부 출강 활동에 관심은 있었지만, 막연히 ‘내가 할 수 있을까’ 하는 부담이 컸습니다. 자격 과정을 통해 스탬프 제작 원리부터 포트폴리오 준비까지 차근차근 배우면서 자신감을 얻었습니다. 특히 단순 제작 기술만 배우는 것이 아니라, 교육 프로그램으로 어떻게 구성할 수 있는지를 배운 점이 큰 장점이었습니다.", "I was interested in cultural center or external lecture activities, but I had a big burden of vaguely thinking, 'Can I do it?'. Through the certification course, I gained confidence by learning step by step from the principles of stamp making to portfolio preparation. In particular, the biggest advantage was learning how to organize it into an educational program, not just learning simple production techniques."),
    },
    {
      name: "장*정",
      role: t("2급 자격증", "Level 2 Certified"),
      content: t("처음에는 자격증이 이름만 있는 과정은 아닐까 걱정 했습니다. 그런데 실제로 준비해보니 제작 실습, 포트폴리오, 수업 기획까지 생각보다 꼼꼼하게 과정을 밟게 되어 오히려 더 만족스러웠습니다. 자격증을 준비하는 과정 자체가 실력을 정리하고 현장에 적용하는 연습이 되었고, 취득 후에는 제 활동을 소개할 때 전문성을 보여주는 기준이 되어 주었습니다. 단순한 수료가 아니라 실제 활용을 염두에 둔 과정이라는 점이 인상적이었습니다.", "At first, I was worried that the certification was just a course in name only. However, when I actually prepared for it, I was rather more satisfied because I went through the process more meticulously than I thought, including production practice, portfolio, and class planning. The process of preparing for the certification itself became an exercise in organizing my skills and applying them to the field, and after obtaining it, it became a standard showing my professionalism when introducing my activities. It was impressive that it was not just a simple completion, but a course with actual application in mind."),
    },
    {
      name: "김*지",
      role: t("1급 자격증 취득", "Level 1 Certified"),
      content: t("평소 다꾸(다이어리 꾸미기)에 관심이 많았는데, 스탬프 아트라는 새로운 세계를 알게 되어 너무 즐거웠습니다. 체계적인 커리큘럼 덕분에 기초부터 탄탄하게 배울 수 있었고, 지금은 작은 공방 창업을 준비하고 있습니다.", "I was always interested in diary decorating, and learning about the new world of stamp art was so much fun. Thanks to the systematic curriculum, I was able to learn solidly from the basics, and now I'm preparing to open a small workshop."),
    },
    {
      name: "이*현",
      role: t("마스터 자격증 취득", "Master Certified"),
      content: t("미술 학원을 운영하면서 아이들에게 새로운 미술 활동을 제공하고 싶어 수강하게 되었습니다. 아이들의 반응이 폭발적이고, 학부모님들의 만족도도 매우 높습니다. 강사로서의 역량을 한 단계 높일 수 있는 훌륭한 과정이었습니다.", "I took this course because I wanted to provide new art activities to children while running an art academy. The children's reactions are explosive, and the parents' satisfaction is very high. It was an excellent course to elevate my skills as an instructor."),
    },
    {
      name: "박*윤",
      role: t("2급 자격증 취득", "Level 2 Certified"),
      content: t("취미로 시작했지만, 자격증까지 취득하게 되어 정말 뿌듯합니다. 온라인으로도 충분히 꼼꼼한 피드백을 받을 수 있어서 직장 생활과 병행하기 좋았습니다. 나만의 굿즈를 만드는 재미에 푹 빠져있어요.", "I started it as a hobby, but I'm really proud to have obtained the certification. It was great to balance with work because I could get thorough feedback online. I'm totally into the fun of making my own goods."),
    },
  ];

  const handleShowDetails = (cert: string) => {
    setSelectedCert(cert);
    setShowCertModal(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden bg-white dark:bg-[#0a0a0a]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/30 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-emerald-600 dark:text-emerald-400 mb-6 flex items-center justify-center gap-3">
                <span className="w-8 h-[1px] bg-emerald-600/30 dark:bg-emerald-400/30"></span>
                CERTIFICATION INFO
                <span className="w-8 h-[1px] bg-emerald-600/30 dark:bg-emerald-400/30"></span>
              </h2>
              <h1 className="text-4xl md:text-6xl font-sans font-medium text-black dark:text-white leading-[1.1] mb-8 tracking-tight">
                {t('스탬프제작지도사', 'Stamp Making Instructor')}<br />
                <span className="text-emerald-500">{t('자격증 안내', 'Certification Guide')}</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                {t('전문적인 스탬프 제작 기술을 습득하고 교육 전문가로 거듭나기 위한 체계적인 교육 과정을 안내해 드립니다.', 'We guide you through a systematic curriculum to acquire professional stamp making skills and become an education expert.')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Certification Levels Section */}
      <div className="py-24 bg-emerald-50/40 dark:bg-white/5 border-y border-black/5 dark:border-white/5 transition-colors duration-300" id="cert-levels">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
              CURRICULUM
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('자격증 등급별 안내', 'Certification Levels')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: '2급',
                level: t('2급 (기초)', 'Level 2 (Basic)'),
                title: t('스탬프 제작의 기초', 'Basics of Stamp Making'),
                desc: t('스탬프 제작의 기본 원리를 이해하고 기초적인 제작 기술을 습득하는 과정입니다.', 'A course to understand the basic principles of stamp making and acquire basic production techniques.'),
                items: [
                  t('스탬프 제작 도구 및 재료 이해', 'Understanding tools and materials'),
                  t('기본 디자인 전사 및 조각 기법', 'Basic design transfer and carving'),
                  t('잉크 패드 활용 및 찍기 기초', 'Ink pad utilization and stamping basics'),
                  t('간단한 문구 및 로고 제작', 'Simple text and logo production')
                ],
                icon: <BookOpen className="w-6 h-6" />,
                color: 'bg-blue-500'
              },
              {
                id: '1급',
                level: t('1급 (심화)', 'Level 1 (Advanced)'),
                title: t('전문 제작 및 디자인', 'Professional Production & Design'),
                desc: t('다양한 재료와 정교한 디자인을 활용하여 상업적 가치가 있는 스탬프를 제작하는 과정입니다.', 'A course to produce stamps with commercial value using various materials and sophisticated designs.'),
                items: [
                  t('정교한 인물 및 풍경 조각 기법', 'Sophisticated figure and landscape carving'),
                  t('다색 스탬프 제작 및 레이어링', 'Multi-color stamp production and layering'),
                  t('디지털 툴 연계 디자인 최적화', 'Design optimization linked with digital tools'),
                  t('상업용 패키징 및 브랜딩 기초', 'Commercial packaging and branding basics')
                ],
                icon: <Stamp className="w-6 h-6" />,
                color: 'bg-emerald-500',
                popular: true
              },
              {
                id: '마스터',
                level: t('마스터 (전문가)', 'Master (Expert)'),
                title: t('교육 및 비즈니스 마스터', 'Education & Business Master'),
                desc: t('최고 수준의 제작 기술과 함께 교육 커리큘럼 설계 및 공방 운영 노하우를 전수받는 과정입니다.', 'A course to receive the highest level of production technology along with education curriculum design and workshop operation know-how.'),
                items: [
                  t('최고 난이도 창작 작품 제작', 'Production of highest difficulty creative works'),
                  t('단계별 교육 커리큘럼 설계법', 'Step-by-step education curriculum design'),
                  t('공방 창업 및 비즈니스 모델 구축', 'Workshop startup and business model construction'),
                  t('강사 활동을 위한 교수법 및 스피치', 'Teaching methods and speech for instructors')
                ],
                icon: <Award className="w-6 h-6" />,
                color: 'bg-purple-500'
              }
            ].map((cert, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl border ${cert.popular ? 'border-emerald-500 shadow-emerald-500/10' : 'border-black/5 dark:border-white/5'} shadow-xl flex flex-col h-full group hover:scale-[1.02] transition-all duration-300`}
              >
                <button 
                  onClick={() => handleShowDetails(cert.id)}
                  className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-emerald-500 transition-colors flex items-center gap-1.5 group/btn"
                >
                  {t('자세히보기', 'Details')}
                  <FileText className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                {cert.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className={`w-14 h-14 ${cert.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                  {cert.icon}
                </div>
                <div className="mb-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">{cert.level}</span>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-3">{cert.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{cert.desc}</p>
                </div>
                <div className="space-y-3 mt-auto">
                  {cert.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Opportunities Section */}
      <div className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300" id="career-paths">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
              CAREER PATHS
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('취득 후 활용 방안', 'Career Opportunities')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t('1. 정규 수업 및 클래스 운영', '1. Regular Classes & Course Operation'),
                items: [
                  t('문화센터, 평생교육원, 공방 등에서 정규 수업 운영', 'Regular classes at cultural centers, lifelong education centers, workshops, etc.'),
                  t('성인 취미반, 원데이 클래스, 소규모 그룹 수업 진행', 'Adult hobby classes, one-day classes, small group lessons'),
                  t('초보자 대상 스탬프 제작 기초 교육 운영', 'Basic stamp making education for beginners'),
                  t('오프라인·온라인 클래스 개설 및 관리', 'Opening and managing offline/online classes')
                ],
                icon: <GraduationCap className="w-6 h-6" />,
                color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              },
              {
                title: t('2. 체험 프로그램 운영', '2. Experience Program Operation'),
                items: [
                  t('플리마켓, 박람회, 축제 체험 부스 운영', 'Flea markets, exhibitions, festival experience booths'),
                  t('키즈카페, 미술학원, 지역센터 연계 체험 클래스 진행', 'Experience classes linked with kids cafes, art academies, regional centers'),
                  t('가족 체험 행사 및 시즌별 프로그램 기획', 'Family experience events and seasonal program planning'),
                  t('단기 체험형 수업 및 참여형 이벤트 운영', 'Short-term experiential classes and participatory events')
                ],
                icon: <Palette className="w-6 h-6" />,
                color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
              },
              {
                title: t('3. 창업 및 판매 활동', '3. Startup & Sales Activities'),
                items: [
                  t('스탬프 전문 공방 창업 및 클래스 운영', 'Stamp specialty workshop startup and class operation'),
                  t('맞춤 스탬프 제작·판매 및 온라인 주문 운영', 'Custom stamp production/sales and online order operation'),
                  t('소상공인 대상 로고·포장용 스탬프 제작', 'Logo/packaging stamp production for small business owners'),
                  t('체험과 판매를 연계한 수익형 비즈니스 확장', 'Revenue-generating business expansion linking experience and sales')
                ],
                icon: <Store className="w-6 h-6" />,
                color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
              },
              {
                title: t('4. 기관·기업 프로그램 기획', '4. Institutional & Corporate Program Planning'),
                items: [
                  t('학교, 복지관, 공공기관 대상 프로그램 제안', 'Program proposals for schools, welfare centers, public institutions'),
                  t('지자체·기관 행사 맞춤형 체험 프로그램 기획', 'Customized experience program planning for local government/institutional events'),
                  t('기업 워크숍, 단체 수업, 협업 프로그램 구성', 'Corporate workshops, group classes, collaborative programs'),
                  t('대상별 교육안, 제안서, 운영안 작성 및 협의', 'Writing and discussing education plans, proposals, and operation plans by target')
                ],
                icon: <Building2 className="w-6 h-6" />,
                color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
              },
              {
                title: t('5. 브랜딩·디자인 활용', '5. Branding & Design Utilization'),
                items: [
                  t('스탬프를 활용한 로고, 패키지, 굿즈 디자인', 'Logo, package, and goods design using stamps'),
                  t('소상공인·소규모 브랜드 맞춤 제작 제안', 'Customized production proposals for small business owners/small brands'),
                  t('문구, 엽서, 포장재 등 감성 상품 제작 활용', 'Utilization in producing emotional products such as stationery, postcards, packaging'),
                  t('브랜드 콘셉트에 맞춘 시각 요소 개발', 'Visual element development tailored to brand concepts')
                ],
                icon: <ShoppingBag className="w-6 h-6" />,
                color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
              },
              {
                title: t('6. 교육 기획 및 전문가 활동', '6. Education Planning & Expert Activities'),
                items: [
                  t('후배 강사 양성 및 멘토링 활동', 'Training junior instructors and mentoring activities'),
                  t('연령·대상별 교육 커리큘럼 개발', 'Educational curriculum development by age/target'),
                  t('교육 콘텐츠, 교안, 활동지 제작', 'Production of educational content, lesson plans, activity sheets'),
                  t('전문 교육자 및 상위 과정 운영 역량 확장', 'Expansion of professional educator and advanced course operation capabilities')
                ],
                icon: <UserCheck className="w-6 h-6" />,
                color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-[#1e1e1e] p-8 rounded-3xl border border-black/5 dark:border-white/5 hover:border-emerald-500/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-4">{item.title}</h4>
                <ul className="space-y-2">
                  {item.items.map((bullet, i) => (
                    <li key={i} className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-white dark:bg-[#121212] border-b border-black/5 dark:border-white/5 transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
              REVIEW
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <p className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white leading-tight">
              {t('자격증 응시 후기', 'Certification Testimonials')}
            </p>
          </div>

          <div className="relative w-full h-[300px] md:h-[350px] flex justify-center perspective-1000">
            {testimonials.map((testimonial, index) => {
              const N = testimonials.length;
              let diff = (index - activeTestimonial) % N;
              if (diff > Math.floor(N / 2)) diff -= N;
              if (diff < -Math.floor(N / 2)) diff += N;

              let translateX = '0%';
              let scale = 1;
              let opacity = 0;
              let zIndex = -1;

              if (diff === 0) {
                translateX = '0%';
                scale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (diff === 1) {
                translateX = '50%';
                scale = 0.9;
                opacity = 0.7;
                zIndex = 20;
              } else if (diff === -1) {
                translateX = '-50%';
                scale = 0.9;
                opacity = 0.7;
                zIndex = 20;
              } else if (diff === 2) {
                translateX = '75%';
                scale = 0.8;
                opacity = 0.4;
                zIndex = 10;
              } else if (diff === -2) {
                translateX = '-75%';
                scale = 0.8;
                opacity = 0.4;
                zIndex = 10;
              }

              const isExpanded = expandedTestimonial === index;

              return (
                <div
                  key={index}
                  className={`absolute top-0 transition-all duration-500 ease-in-out cursor-pointer w-[85vw] sm:w-[450px] md:w-[500px] ${isExpanded ? 'h-auto min-h-[300px] md:min-h-[320px] z-50' : 'h-full'} ${Math.abs(diff) > 2 ? 'pointer-events-none' : ''}`}
                  style={{ 
                    transform: `translateX(${translateX}) scale(${scale})`, 
                    opacity, 
                    zIndex: isExpanded ? 50 : zIndex 
                  }}
                  onClick={() => {
                    if (Math.abs(diff) <= 2 && diff !== 0) {
                      setActiveTestimonial(index);
                      setExpandedTestimonial(null);
                    }
                  }}
                >
                  <div className="bg-gray-50 dark:bg-[#1e1e1e] p-6 md:p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-2xl h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <div className="flex flex-col justify-start mb-4">
                      <div className={`relative w-full ${isExpanded ? '' : 'h-[92px]'}`}>
                        <p className={`text-gray-600 dark:text-gray-300 leading-relaxed text-sm ${isExpanded ? '' : 'line-clamp-4'}`}>
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div className="h-6 mt-2">
                        {testimonial.content.length > 150 && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedTestimonial(isExpanded ? null : index);
                            }}
                            className="text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm font-medium self-start"
                          >
                            {isExpanded ? t('접기', 'Show less') : t('더보기', 'Read more')}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="font-bold text-black dark:text-white text-lg">{testimonial.name[0]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-black dark:text-white text-base">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-emerald-50/40 dark:bg-white/5 border-y border-black/5 dark:border-white/5 transition-colors duration-300" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
              FAQ
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('자주 묻는 질문', 'Frequently Asked Questions')}</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: t('정식으로 허가된 자격증인가요?', 'Is it an officially licensed certificate?'),
                a: t('민간자격등록허가증을 받은 정식 자격증입니다.', 'It is an official certificate that has received a private qualification registration license.'),
                images: [
                  'https://i.ibb.co/G43639Hq/1773106303264-9f665cd2-a080-4f8d-8360-12683a80e597-1.png',
                  'https://i.ibb.co/kV3nWHL8/1773106303264-9f665cd2-a080-4f8d-8360-12683a80e597-2.png'
                ]
              },
              {
                q: t('자격증 취득 후 바로 강사로 활동할 수 있나요?', 'Can I work as an instructor immediately after obtaining the certification?'),
                a: t('1급 또는 마스터 자격증을 취득하시면 방과후 학교, 문화센터 등에서 강사로 활동하실 수 있는 자격이 주어집니다. 진흥원에서도 우수 수료자에게 출강 기회를 연결해 드리고 있습니다.', 'If you obtain a Level 1 or Master certification, you will be qualified to work as an instructor at after-school programs, cultural centers, etc. The Institute also connects excellent graduates with teaching opportunities.')
              },
              {
                q: t('온라인으로도 시험 응시가 가능한가요?', 'Is it possible to take the exam online?'),
                a: t('네, 포트폴리오 우편 제출 및 지정된 주제의 스탬프 제작 과정을 담은 영상 제출을 통해 온라인(비대면)으로도 충분히 응시 및 자격 취득이 가능합니다.', 'Yes, you can fully apply and obtain the certification online (non-face-to-face) by submitting your portfolio by mail and a video showing the stamp making process on a designated topic.')
              },
              {
                q: t('수강료 결제는 어떻게 하나요?', 'How do I pay the tuition fee?'),
                a: t('무통장 입금, 계좌이체 등을 통해 결제하실 수 있으며, 현금영수증 및 세금계산서 발행이 가능합니다. 자세한 계좌 정보는 접수 페이지를 참고해 주세요.', 'You can pay via bank transfer, etc., and cash receipts and tax invoices can be issued. Please refer to the application page for detailed account information.')
              }
            ].map((faq, index) => (
              <div key={index} className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#1e1e1e] transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 md:p-8 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-black dark:text-white pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 md:p-8 pt-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    <p>{faq.a}</p>
                    {faq.images && (
                      <div className="flex gap-4 mt-4">
                        {faq.images.map((img, i) => (
                          <img 
                            key={i} 
                            src={img} 
                            alt={`License ${i+1}`} 
                            className="w-24 h-32 object-cover rounded-lg border border-black/10 dark:border-white/10 cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(img);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img 
              src={selectedImage} 
              alt="License Full" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors"
            >
              <span className="text-sm font-bold tracking-widest uppercase">Close</span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CertificationInfoPage;
