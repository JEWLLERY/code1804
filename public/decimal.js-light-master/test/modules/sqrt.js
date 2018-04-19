if (typeof T === 'undefined') require('../setup');

T('sqrt', function () {

  function t(expected, n, sd) {
    Decimal.precision = sd;
    T.assertEqual(expected, new Decimal(n).sqrt().valueOf());
  }

  Decimal.config({
    precision: 20,
    rounding: 4,
    toExpNeg: -9e15,
    toExpPos: 9e15
  });

  // Test against Math.sqrt of squared integers.
  for (var i = 0; i < 500; i++) {
    var j = Math.floor(Math.random() * Math.pow(2, Math.floor(Math.random() * 26) + 1));
    j *= j;
    t(Math.sqrt(j).toString(), j.toString(), 20, 4);
  }

  t('10', '101', 2);
  t('10', '111', 2);
  t('999', 999000.25, 3);
  t('0.00999999999999999999999999999949', '0.00009999999999999999999999999999', 30);

  Decimal.toExpNeg = Decimal.toExpPos = 0;

  t('5.6790521336e+45232', '3.2251633136582109206181686755297199980106981532535904612E+90465', 11);
  t('9.6241485526139652228166208472049625290167818011e+1987400693503696', '9.262423536278148172467483107114956962585715251496115897712401E+3974801387007393', 47);
  t('9.4527e+117835031340212', '8.935356909E+235670062680425', 6);
  t('6.01309285636782899752364197007684920017398969437949e-1790', '3.61572856993018165706134046141609828036662065978484170009821375392882703132369124228069E-3579', 51);
  t('1.257819302229712520962174337277372176639810260661e-44311330', '1.582109397061640889607372828919871087547023353618955613E-88622660', 49);
  t('3.9031901238112199422244215131891752614639270293050848390039e+24964497874732', '1.5234893142617446461800063194E+49928995749465', 59);
  t('2.20453501e-357801904289', '4.859974646744411255356204868440980E-715603808578', 9);
  t('9.6614424956e+33826', '9.3343471095787978641040077990615E+67653', 12);
  t('6.840414600748481921789126213883996657219910998072878638534975744655859056193334e+365397755685166', '4.6791271910133013331845019336634770531377970763582548051313437429709245928538732275037320149E+730795511370333', 79);
  t('3.1595298775034276812747891834935798726890112101053025250708e+161894746', '9.982629046836824729046499174522512414789196378588531892708638648812537073974580E+323789492', 59);
  t('2.21e+957', '4.88485916656072684684336288223350318510382769049147063964695662933003E+1914', 3);
  t('5.03544006612282891778e+46195820165472', '2.53556566595150796637413433477866041357009510845074403852348490716635E+92391640330945', 21);
  t('6.0271249500033e-10781347401', '3.6326235162953181809577645353279210E-21562694801', 14);
  t('5.0973657635624059747024576803245965274249298527568449922667e+1692063437920', '2.598313772753815009002620426366701559965597345321262947368693172122554312019668885696226081E+3384126875841', 59);
  t('7.552132321848183098292052759964393e+3', '57034702.6067040290231940776601570114357688435285519762590782006101866084636618667', 34);
  t('7e+413483559541878', '4.9446671019E+826967119083757', 2);
  t('2.3540150674351154530407163580243074454938968196e+2160300', '5.54138693771155115387408E+4320600', 47);
  t('1.1573376026021382616589933753247694e+358389221', '1.33943032639686490800430635561822376604163268393006414770600700814939E+716778442', 35);
  t('6.63236207127e+23317', '4.39882266444868312494846698153144297198308093870920987520682921E+46635', 12);
  t('7.2998671170787362309999885642096413366997803441454046e-3', '0.000053288059927007419736192864488572091336455240976257828090775274140470718273556545610819', 53);
  t('8.937227578505540103845413636584692573241532357433996111863e+1790938', '7.987403679E+3581877', 58);
  t('1.401091686602968166559525283171170204216e+4918493', '1.9630579142679499665419988066E+9836986', 40);
  t('1.0245391862903256753964503966393139032236946080277416684518e-38', '1.0496805442444426583754480311188446871883996972187399715782318606844535332564E-76', 59);
  t('1.7128627267646388333852869565663674027391841238236919212997718917108311794e-4002', '2.9338987207395937897002373949538359655732613253567763605075447290049969107E-8004', 74);
  t('2.8264310169258223109845135255342978316223511737459003e-16767859699', '7.988712293440338047E-33535719398', 53);
  t('6.649283812592150138142528590709054870664998836855393073088808237856384012e+16918', '4.42129752204E+33837', 73);
  t('2.90723345116412399903677294614733205e+380', '8.4520063395676629612501328633225132880746874537228627270266E+760', 36);
  t('3.49559682514708909727859773952360298460003998789958980573672291458393004e+132', '1.22191971639784089879E+265', 72);
  t('2.902077e+1588760762', '8.422051691577715414082824473132488156131471218330734604226191089990683764449E+3177521524', 7);
  t('2.18935e-192883592280', '4.79327125880129020E-385767184560', 6);
  t('2.3774545577213805010498159234873880660721178e+422716', '5.65229017403016496862404612990739165210984813062645469906426138589591E+845432', 44);
  t('4.621003503308429392531555236351223553159256034625873954713601722906751e+22257918209422', '2.135367337758877761572808626061137813597705703296648884770002410767354094917580791680252657855994460E+44515836418845', 71);
  t('2.02207593759537562422226807353364843462858518254559656e-28012230172050', '4.08879109740221741578687735602952948096051E-56024460344100', 54);
  t('5.3731000956898735111861968797250897647473152496311640907459600751218763861e+454513139585766', '2.88702046383025278824610014957155384890357084971884613239765424667693727485508799293067464689E+909026279171533', 74);
  t('3.0742131314253906754227821858e+96706326503', '9.450786377428306361560309171177304320240134953027243301587893245054872736802088043071493639E+193412653006', 29);
  t('3.006875499403192963673188892347469682563777463469587792654e+20786', '9.041300268911201088838782013152679784074371858101273E+41572', 58);
  t('2.85909217357538160219868784409618103905259254542127e-30883978641744', '8.174408057E-61767957283488', 51);
  t('1.650095715573914339995571593605530228843869509809576660267100705710199e+460348481858', '2.72281587055538841173686928082096620997022877836901707243689996E+920696963716', 71);
  t('5.0531262501544526519574040306536300193230181695512694054594791474960429e+43540097', '2.553408490E+87080195', 71);
  t('4.962894523835293602541700098665678245210425304527057712473799410572054423102e+99', '2.463032205471434562E+199', 76);
  t('4.90795797150709105376962677572069305380908614111297365553e+4086', '2.4088051450080E+8173', 57);
  t('2.2706488927283296329062209956647601583635908763632678803367026671603381e+37', '515584639404838941246901894159595954745567752911318738407100564309750626516.1791617', 71);
  t('3.01621123e+412557134', '9.097530205431698341141736543467287960383290070775938518339807290620844422120352E+825114268', 9);
  t('6.01199e+2879412', '3.61440703564099768E+5758825', 6);
  t('5.175035338263985141e-19506965', '2.678099075228103912053736336553650966855863923E-39013929', 19);
  t('5.2064477870639497e-28517', '2.71070985594230989175938821603202E-57033', 17);
  t('8.881482619e+2095399787486186', '7.888073352767506531631057273649734668539553289948510498240822582019489548040318306E+4190799574972373', 10);
  t('8.919264136401625271884219060858252e+9', '79553272734900230263.41763128677730026531493235388640071381802652591', 34);
  t('2.5833750802158470838638220584e+18913396', '6.6738268050802343551355260020766554923882450343012342734378848E+37826792', 30);
  t('6.04693544698469e-220', '3.65654283E-439', 15);
  t('1.245345961467927340281476373719978090064081519e+42', '1.550886563744476367740974406041099100674095756961953547612335899E+84', 46);
  t('1.90934970073455410278410575623977888122382805484e+422554664715', '3.6456162796951313121087727108063524737724086412612828706606881122179782708607529986314383405E+845109329430', 48);
  t('1.576844611205999099662237540201844126209316481620105534e+335357340260426', '2.486438927889398461388938E+670714680520852', 55);
  t('2.7450159803706115172884307982554068123557452994357916574e+29493402848956', '7.535112732490029474794930517417328483099871453263111571224994801873955541077813E+58986805697912', 56);
});
