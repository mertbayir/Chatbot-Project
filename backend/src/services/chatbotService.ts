export class ChatbotService {
  private services = {
    'dijital-marka': {
      name: 'Dijital Marka Deneyimi',
      description: 'Markanızın dijitaldeki algısını ve müşteri deneyimini güçlendiren yaratıcı çözümler.',
      features: [
        'Modern ve kullanıcı dostu web sitesi',
        'Dijital kampanya ve marka algısı yönetimi',
        'Online görünürlük ve etkileşim artırımı',
        'Ziyaretçi deneyimi optimizasyonu',
        'Dijital ortamda marka prestiji'
      ],
      detailUrl: 'https://www.solelunatech.com/dijital-marka-deneyimi'
    },
    'akilli-urun': {
      name: 'Akıllı Ürün Çözümleri',
      description: 'Ürünlerinize akıllı, IoT ve teknolojik özellikler kazandıran inovatif çözümler.',
      features: [
        'IoT ve sensör entegrasyonu',
        'Uzaktan kontrol ve takip',
        'Veri toplama ve analiz',
        'Akıllı uygulama ile ürün yönetimi',
        'Teknolojik ürün farklılaştırma'
      ],
      detailUrl: 'https://www.solelunatech.com/akilli-urun-cozumleri'
    },
    'otomasyon-lab': {
      name: 'Akıllı Otomasyon Lab',
      description: 'İş süreçlerinizi dijitalleştirip otomatikleştiren, verimliliği artıran akıllı otomasyon çözümleri.',
      features: [
        'Süreç otomasyonu',
        'Veri akışı ve raporlama',
        'IoT ve sensör tabanlı izleme',
        'Laboratuvar/test ortamı otomasyonu',
        'Veriye dayalı optimizasyon'
      ],
      detailUrl: 'https://www.solelunatech.com/akilli-otomasyon-lab'
    },
    'surekli-destek': {
      name: 'Sürekli Destek Ekosistemi',
      description: 'Müşteri memnuniyetini ve operasyonel sürekliliği sağlayan kapsamlı destek çözümleri.',
      features: [
        '7/24 destek ve hızlı yanıt',
        'Otomatik sorun çözümü',
        'Destek süreçlerinin dijitalleştirilmesi',
        'Müşteri memnuniyeti takibi',
        'Geri bildirim ve self-servis altyapı'
      ],
      detailUrl: 'https://www.solelunatech.com/surekli-destek-ekosistemi'
    },
    'mobil-uygulama': {
      name: 'Mobil Uygulama Çözümleri',
      description: 'iOS ve Android için markanıza özel, fonksiyonel ve kullanıcı odaklı mobil uygulama geliştirme.',
      features: [
        'iOS ve Android uygulama geliştirme',
        'Kullanıcı deneyimi ve tasarım',
        'Bildirim, mesajlaşma ve ödeme entegrasyonu',
        'Web ile entegre mobil çözümler',
        'Analitik ve raporlama özellikleri'
      ],
      detailUrl: 'https://www.solelunatech.com/mobil-uygulama-cozumleri'
    }
  };

  private responses: { [key: string]: string[] } = {
    greeting: [
      'Merhaba! Sole Luna Tech\'e hoş geldiniz. Size nasıl yardımcı olabilirim?',
      'Selam! Sole Luna Tech\'in hizmetleri hakkında bilgi vermek için buradayım. Size nasıl yardımcı olabilirim?',
      'İyi günler! Sole Luna Tech olarak size nasıl destek olabilirim?'
    ],
    services: [
      'Sole Luna Tech Hizmetlerimiz:\n\n' +
      '- Dijital Marka Deneyimi\n' +
      '- Akıllı Ürün Çözümleri\n' +
      '- Akıllı Otomasyon Lab\n' +
      '- Sürekli Destek Ekosistemi\n' +
      '- Mobil Uygulama Çözümleri\n\n' +
      'Herhangi bir hizmet hakkında detay öğrenmek isterseniz, başlığını veya ilgili anahtar kelimeleri yazabilirsiniz.\n\n' +
      'Teklif almak için iletişim yazınız veya https://www.solelunatech.com/iletisim adresinden bize ulaşabilirsiniz.',
    ],
    contact: [
      'İletişim Bilgileri:\n\n' +
      'Website:\n https://www.solelunatech.com\n\n' +
      'Teklif Al: https://www.solelunatech.com/iletisim\n\n' +
      'Hizmetlerimiz: https://www.solelunatech.com/hizmetler\n\n' +
      'Chat üzerinden iletişim kurabilirsiniz.\n\n' +
      'Size özel bir teklif hazırlamak için iletişime geçin.'
    ],
    company: [
      'Sole Luna Tech Hakkında:\n\n' +
      'Teknoloji alanında yenilikçi çözümler sunan bir yazılım stüdyosuyuz.\n' +
      'Web tasarımından mobil uygulamalara, yapay zeka çözümlerinden sürekli desteğe kadar geniş bir hizmet yelpazesi sunuyoruz.\n\n' +
      'Misyonumuz: Müşterilerimizin dijital dönüşümünde güvenilir partner olmak\n\n' +
      'Daha fazla bilgi: https://www.solelunatech.com/hakkimizda'
    ],
    default: [
      'Bu konuda size nasıl yardımcı olabilirim?\n\nÖneriler:\n- Hizmetler yazarak tüm hizmetlerimizi görebilirsiniz\n- Belirli bir hizmet adı yazarak detay alabilirsiniz\n- İletişim yazarak iletişim bilgilerini öğrenebilirsiniz',
      'İlginç bir soru! Size daha iyi yardımcı olabilmem için:\n- Hangi hizmetimizle ilgileniyorsunuz?\n- Hizmetler yazarak tüm seçenekleri görebilirsiniz',
      'Bu konuyu daha detaylı açıklayabilir misiniz?\n\nSole Luna Tech olarak size nasıl yardımcı olabilirim?'
    ],
    goodbye: [
      'Görüşmek üzere! Sole Luna Tech ekibi olarak size yardımcı olabildiysek ne mutlu bize.',
      'Hoşça kalın! İhtiyacınız olduğunda tekrar bekleriz.',
      'İyi günler! Projelerinizde başarılar dileriz.'
    ]
  };

  private keywords = {
    greeting: [
      // ...existing code...
      'merhaba', 'meraba', 'merhba', 'mrb', 'mraba',
      'selam', 'selamm', 'slm', 'slam', 'selam',
      'hey', 'hi', 'hello', 'helo', 'hllo',
      'iyi günler', 'iyi gunler', 'iyigunler', 'iyigünler', 'günaydın', 'gunaydin', 'gunaydın',
      'merhabalar', 'merhalbar', 'meraba lar',
      'naber', 'nbr', 'nasılsın', 'nasilsin', 'nasılsınız', 'nasilsiniz'
    ],
    services: [
      'hizmet', 'hizmetler', 'hizmetleriniz', 'hizmetlerinizi',
      'ürün', 'ürünler', 'urun', 'urunler', 'ürünleriniz', 'urunleriniz',
      'service', 'services', 'servis', 'servisler',
      'ne yapıyorsunuz', 'ne yapiyorsunuz', 'neler yapıyorsunuz', 'neler yapiyorsunuz',
      'hangi hizmetler', 'hangi hizmetleri', 'hangi hizmetleriniz',
      'ne iş yapıyorsunuz', 'ne is yapiyorsunuz', 'ne işi yapıyorsunuz',
      'hzmt', 'hzmtlr', 'serv'
    ],
    web: [
      'web', 'website', 'site', 'websitesi', 'web sitesi', 'tasarım', 'tasarim', 'design', 'dizayn', 'dijital marka', 'dijital', 'web tasarım', 'web tasarim',
      // Dijital Marka Deneyimi anahtar kelime ve kombinasyonları
      'ziyaretçi deneyimi', 'dijital deneyim', 'online marka', 'marka algısı', 'kullanıcı dostu', 'dijital kampanya',
      'online görünürlük', 'etkileşim', 'web sitesi deneyimi', 'web sitesi kullanıcı', 'web sitesi geliştirme',
      'web sitesi tasarımı', 'web sitesi optimizasyonu', 'web sitesi performansı', 'web sitesi görünürlüğü',
      'marka görünürlüğü', 'marka etkileşimi', 'dijital ortam', 'müşteri deneyimi', 'dijital ortamda çekici',
      'markamın web sitesi', 'müşterilerimizle online', 'ürünleri dijital ortamda',
      'kullanıcı deneyimi', 'dijital marka deneyimi', 'marka deneyimi',
      'ziyaretçilere daha iyi deneyim', 'müşteri deneyimini geliştirmek',
      'online marka algısı', 'marka algımızı güçlendirmek',
      'web sitemizdeki deneyimi geliştirmek', 'kampanyaların etkili olması',
      'markamızın online görünürlüğü', 'markamızın etkileşimi',
      'web sitemin kullanıcı dostu', 'ürünleri çekici göstermek',
      'web sitesi kullanıcı deneyimi', 'web sitesi performansı artırmak'
    ],
    mobile: [
      'mobil', 'mobile', 'app', 'uygulama', 'uygulamalar', 'ios', 'android', 'telefon uygulaması', 'telefon uygulamasi', 'mobil app', 'mobil uygulama',
      // Mobil Uygulama Çözümleri anahtar kelime ve kombinasyonları
      'mobil uygulama geliştirmek', 'uygulama geliştirmek', 'uygulama üzerinden hizmet', 'ios android uygulama',
      'uygulama tasarımı', 'uygulama ile işlem', 'mobil uygulama entegrasyonu', 'uygulamaya bildirim',
      'uygulamaya mesajlaşma', 'uygulamada veri girişi', 'uygulamada takip', 'mvp uygulama',
      'uygulama ile ödeme', 'uygulama ile rezervasyon', 'uygulama ile sipariş', 'uygulama performansı',
      'uygulama kullanıcı deneyimi', 'uygulamada profil', 'uygulamada içerik yönetimi',
      'uygulama analitik', 'uygulama raporlama', 'uygulama ile marka deneyimi',
      'uygulama üzerinden işlem', 'uygulama ile web entegrasyonu', 'uygulama ile müşteri',
      'uygulama ile özel hizmet', 'uygulama ile bildirim', 'uygulama ile mesajlaşma'
    ],
    ai: [
      'ai', 'yapay zeka', 'yapay', 'zeka', 'otomasyon', 'chatbot', 'bot', 'akıllı', 'akilli', 'automation', 'oto', 'otomatik',
      // Akıllı Otomasyon Lab anahtar kelime ve kombinasyonları
      'otomatik süreç', 'veri akışı', 'raporlama', 'tekrarlayan işler', 'fabrika süreçleri',
      'dijitalleştirme', 'iot sensör', 'veri işleme', 'sistem entegrasyonu', 'laboratuvar otomasyon',
      'rutin operasyon', 'insan hatası azaltmak', 'veriye dayalı optimizasyon', 'akıllı otomasyon',
      'otomasyon laboratuvarı', 'akıllı sistem', 'veriyle süreç optimizasyonu', 'otomatik raporlama',
      'otomasyon çözümü', 'süreç otomasyonu', 'süreç izleme', 'otomasyon sistemi',
      'test ortamı otomasyon', 'süreç optimizasyonu', 'otomatik veri işleme', 'entegre otomasyon'
    ],
    startup: [
      'startup', 'start up', 'girişim', 'girisim', 'mvp', 'prototip', 'hızlı', 'hizli', 'akıllı ürün', 'akilli urun',
      // Akıllı Ürün Çözümleri anahtar kelime ve kombinasyonları
      'internet üzerinden kontrol', 'takip özelliği', 'cihaz akıllı', 'iot özellikli',
      'telefon ile kontrol', 'akıllı sensör', 'verimli ürün', 'veri toplama',
      'veri analizi', 'ürün etkileşimi', 'uzaktan yönetim', 'akıllı özellik',
      'teknolojik özellik', 'internet erişimi', 'uzaktan erişim', 'sensör eklemek',
      'uygulama ile kontrol', 'iot ürün', 'akıllı ürün çözümü', 'ürün uygulaması',
      'ürünümüzü akıllı hale getirmek', 'ürünümüzü iot yapmak', 'ürünümüzü uzaktan yönetmek'
    ],
    support: [
      'destek', 'support', 'yardım', 'yardim', 'teknik destek', 'teknik', 'sürekli destek', 'surekli destek', 'bakım', 'bakim',
      // Sürekli Destek Ekosistemi anahtar kelime ve kombinasyonları
      '7/24 destek', 'hızlı yanıt', 'otomatik çözüm', 'destek süreci', 'geri bildirim',
      'destek ekibi', 'müşteri talepleri', 'online destek', 'self-servis', 'sorun çözme',
      'müşteri memnuniyeti', 'destek altyapısı', 'otomatik destek', 'destek sistemi',
      'destek çözümü', 'destek ekosistemi', 'destek platformu', 'destek uygulaması',
      'müşteri destek', 'müşteri destek süreci', 'müşteri destek sistemi',
      'müşteri sorunları', 'müşteri taleplerini izlemek', 'destek ve geri bildirim',
      'müşteri destek ekibi', 'müşteri destek platformu', 'müşteri destek uygulaması'
    ],
    contact: ['iletişim', 'iletisim', 'contact', 'teklif', 'fiyat', 'ücret', 'ucret', 'maliyet', 'görüşme', 'gorusme', 'randevu', 'ara', 'arayın', 'arayin'],
    company: ['sole luna', 'solelunatech', 'sole luna tech', 'şirket', 'sirket', 'company', 'hakkında', 'hakkinda', 'kim', 'ne', 'studio', 'kimsiniz', 'nedir'],
    goodbye: ['görüşürüz', 'gorusuruz', 'hoşça kal', 'hosca kal', 'bye', 'bay', 'güle güle', 'gule gule', 'teşekkür', 'tesekkur', 'sağol', 'sagol', 'thx', 'thanks']
  };

  async generateResponse(message: string): Promise<string> {
    const normalizedMessage = message.toLowerCase().trim();
    
    // Mesaj kategorisini belirle
    const category = this.categorizeMessage(normalizedMessage);
    
    // Debug log
    console.log(`🔍 Debug - Mesaj: "${message}" | Kategori: "${category}"`);
    
    // Eğer kategori bir hizmet detayıysa, onu döndür
    if (category.startsWith('SERVICE_DETAIL:')) {
      return category.replace('SERVICE_DETAIL:', '');
    }
    
    // Random yanıt seç
    const responses = this.responses[category] || this.responses['default'];
    const randomIndex = Math.floor(Math.random() * responses.length);
    
    console.log(`🔍 Debug - Kullanılan kategori: "${category}" | Response sayısı: ${responses.length}`);
    
    return responses[randomIndex];
  }

  private getServiceDetails(serviceKey: string): string {
    const service = this.services[serviceKey as keyof typeof this.services];
    if (!service) return 'default';


    const details = `${service.name}\n\n${service.description}\n\n Özellikler:\n${service.features.map(f => `• ${f}`).join('\n')}\n\nDetaylı bilgi: ${service.detailUrl}`;

    return `SERVICE_DETAIL:${details}`;
  }

  private categorizeMessage(message: string): string {
    console.log('📝 Message to categorize:', message);
    console.log('🔤 Available service keywords:', this.keywords.services);
    
    // Greeting kontrolü
    if (this.containsKeywords(message, this.keywords.greeting)) {
      console.log('✅ Matched: greeting');
      return 'greeting';
    }
    
    // Services kontrolü
    if (this.containsKeywords(message, this.keywords.services)) {
      console.log('✅ Matched: services');
      return 'services';
    }
    
    // Specific service kontrolü
    if (this.containsKeywords(message, this.keywords.web)) {
      return this.getServiceDetails('dijital-marka');
    }
    
    if (this.containsKeywords(message, this.keywords.mobile)) {
      return this.getServiceDetails('mobil-uygulama');
    }
    
    if (this.containsKeywords(message, this.keywords.ai)) {
      return this.getServiceDetails('otomasyon-lab');
    }
    
    if (this.containsKeywords(message, this.keywords.startup)) {
      return this.getServiceDetails('akilli-urun');
    }
    
    if (this.containsKeywords(message, this.keywords.support)) {
      return this.getServiceDetails('surekli-destek');
    }
    
    // Contact kontrolü
    if (this.containsKeywords(message, this.keywords.contact)) {
      return 'contact';
    }
    
    // Company kontrolü
    if (this.containsKeywords(message, this.keywords.company)) {
      return 'company';
    }
    
    // Goodbye kontrolü
    if (this.containsKeywords(message, this.keywords.goodbye)) {
      return 'goodbye';
    }
    
    return 'default';
  }

  // Türkçe karakter normalleştirme
  private normalizeTurkish(text: string): string {
    return text.toLowerCase()
      .replace(/[çç]/g, 'c')
      .replace(/[ğğ]/g, 'g')
      .replace(/[ıı]/g, 'i')
      .replace(/[öö]/g, 'o')
      .replace(/[şş]/g, 's')
      .replace(/[üü]/g, 'u')
      .trim();
  }

  // Levenshtein distance - yazım hata toleransı için
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Benzerlik kontrolü
  private isSimilar(word1: string, word2: string, threshold: number = 2): boolean {
    // Tam eşleşme
    if (word1 === word2) return true;
    
    // Normalleştirilmiş eşleşme
    const norm1 = this.normalizeTurkish(word1);
    const norm2 = this.normalizeTurkish(word2);
    if (norm1 === norm2) return true;
    
    // Uzunluk farkı çok fazlaysa benzer değil
    if (Math.abs(word1.length - word2.length) > threshold) return false;
    
    // Levenshtein distance kontrolü
    const distance = this.levenshteinDistance(norm1, norm2);
    return distance <= threshold;
  }

  private containsKeywords(message: string, keywords: string[]): boolean {
    const messageWords = message.toLowerCase().split(/\s+/);
    
    const result = keywords.some(keyword => {
      const normalizedKeyword = keyword.toLowerCase();
      
      // Çoklu kelime keyword'ü kontrol et (örn: "iyi günler")
      if (normalizedKeyword.includes(' ')) {
        const keywordWords = normalizedKeyword.split(' ');
        // Tüm kelimeler mesajda var mı kontrol et
        return keywordWords.every(kw => 
          messageWords.some(mw => this.isSimilar(mw, kw))
        );
      }
      
      // Tek kelime için benzerlik kontrolü
      return messageWords.some(messageWord => 
        this.isSimilar(messageWord, normalizedKeyword)
      );
    });
    
    console.log('🔍 Enhanced keyword check:', { 
      message: message.toLowerCase(), 
      messageWords,
      matchedKeywords: keywords.filter(k => result),
      result 
    });
    
    return result;
  }

  // Gelecekte AI entegrasyonu için
  async generateAIResponse(message: string): Promise<string> {
    // Burada OpenAI, Google AI, ya da başka bir AI servisini entegre edebiliriz
    // Şimdilik basit chatbot mantığı kullanıyoruz
    return this.generateResponse(message);
  }
}
