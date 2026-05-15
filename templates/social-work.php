<?php
$social_cards = array();

if ( function_exists( 'get_field' ) ) {
    $social_work = get_field( 'social_work' );

    if ( is_array( $social_work ) ) {
        if ( isset( $social_work['social'] ) && is_array( $social_work['social'] ) ) {
            $social_cards = $social_work['social'];
        }
    }
}
?>

<section id="social" class="section">
    <div class="container">
        <div class="section-header fade-in">
            <span style="color:var(--primary);font-weight:700;letter-spacing:1px">সমাজসেবা</span>
            <h2>আমাদের পথচলা, মানুষের কল্যাণে</h2>
            <div class="divider"></div>
        </div>

        <?php if ( ! empty( $social_cards ) ) : ?>
            <div class="social-grid" id="socialGrid" data-initial-show="10" data-batch-size="10">
                <?php foreach ( $social_cards as $card ) :
                    $caption = isset( $card['caption'] ) ? (string) $card['caption'] : '';
                    $description = isset( $card['description'] ) ? (string) $card['description'] : '';
                    $image = $card['image'] ?? '';
                    $icon = $card['icon'] ?? '';

                    $image_url = '';
                    if ( is_array( $image ) && ! empty( $image['url'] ) ) {
                        $image_url = $image['url'];
                    } elseif ( is_numeric( $image ) ) {
                        $image_url = wp_get_attachment_image_url( (int) $image, 'large' );
                    } elseif ( is_string( $image ) ) {
                        $image_url = $image;
                    }

                    $icon_url = '';
                    if ( is_array( $icon ) && ! empty( $icon['url'] ) ) {
                        $icon_url = $icon['url'];
                    } elseif ( is_numeric( $icon ) ) {
                        $icon_url = wp_get_attachment_image_url( (int) $icon, 'thumbnail' );
                    } elseif ( is_string( $icon ) ) {
                        $icon_url = $icon;
                    }

                    if ( '' === $image_url ) {
                        $image_url = plugin_dir_url( __FILE__ ) . '../assets/images/hero-image.jpeg';
                    }
                    ?>
                    <div class="social-card fade-in">
                        <div style="position:relative">
                            <img class="social-card-img" src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $caption ? $caption : 'Social Work' ); ?>">
                            <div style="position:absolute;bottom:-20px;right:20px;width:50px;height:50px;background:var(--primary);color:#fff;border-radius:15px;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow);overflow:hidden">
                                <?php if ( $icon_url ) : ?>
                                    <img src="<?php echo esc_url( $icon_url ); ?>" alt="" style="width:26px;height:26px;object-fit:contain;filter:brightness(0) invert(1)">
                                <?php endif; ?>
                            </div>
                        </div>
                        <div class="social-card-content" style="padding-top:35px">
                            <h3 style="margin-bottom:10px;font-size:1.2rem;color:var(--primary-dark)"><?php echo esc_html( $caption ); ?></h3>
                            <p style="color:var(--text-muted);font-size:0.95rem"><?php echo esc_html( $description ); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div style="text-align:center;margin-top:30px">
                <button id="socialLoadMoreBtn" class="btn btn-outline" type="button">আরও দেখুন</button>
            </div>
        <?php else : ?>
            <div style="max-width:760px;margin:0 auto;text-align:center;background:#fff;border:1px solid rgba(0,106,78,.12);border-radius:14px;padding:26px">
                <p style="color:var(--text-muted)">এখনও কোনো Social Work data যোগ করা হয়নি। SCF এর <strong>social_work</strong> field-এ data যোগ করুন।</p>
            </div>
        <?php endif; ?>
    </div>
</section>
