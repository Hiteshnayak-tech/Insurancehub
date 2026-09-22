package com.insurehub.config;

import com.insurehub.entity.Claim;
import com.insurehub.entity.InsurancePlan;
import com.insurehub.entity.Insurer;
import com.insurehub.entity.enums.ClaimStatus;
import com.insurehub.repository.ClaimRepository;
import com.insurehub.repository.InsurancePlanRepository;
import com.insurehub.repository.InsurerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final InsurancePlanRepository planRepository;
    private final InsurerRepository insurerRepository;
    private final ClaimRepository claimRepository;

    @Override
    public void run(String... args) {
        seedInsurers();
        seedPlans();
        seedClaims();
    }

    private void seedInsurers() {
        if (insurerRepository.count() > 0) return;

        List<Insurer> insurers = List.of(
                Insurer.builder().name("Star Health Care").contactEmail("claims@starhealth.demo").supportPhone("1800-425-2255").active(true).build(),
                Insurer.builder().name("HDFC ERGO").contactEmail("care@hdfcergo.demo").supportPhone("1800-266-6400").active(true).build(),
                Insurer.builder().name("ICICI Lombard").contactEmail("service@icicilombard.demo").supportPhone("1800-266-6").active(true).build(),
                Insurer.builder().name("Tata AIG").contactEmail("customersupport@tataaig.demo").supportPhone("1800-266-7780").active(true).build(),
                Insurer.builder().name("Bajaj Allianz").contactEmail("customercare@bajajallianz.demo").supportPhone("1800-209-5858").active(true).build(),
                Insurer.builder().name("Reliance General").contactEmail("rgicl.services@relianceada.demo").supportPhone("1800-3009").active(true).build(),
                Insurer.builder().name("Max Life Insurance").contactEmail("service.helpdesk@maxlife.demo").supportPhone("1860-120-5577").active(true).build(),
                Insurer.builder().name("SBI General").contactEmail("customer.care@sbigeneral.demo").supportPhone("1800-102-1111").active(true).build()
        );

        insurerRepository.saveAll(insurers);
        log.info("Seeded {} insurers into database", insurers.size());
    }

    private void seedPlans() {
        if (planRepository.count() > 0) return;

        List<InsurancePlan> initialPlans = List.of(
                InsurancePlan.builder()
                        .name("CareShield Comprehensive Health")
                        .category("Health")
                        .insurerName("Star Health Care")
                        .rating(4.8)
                        .reviewsCount(1240)
                        .basePremium(BigDecimal.valueOf(8499))
                        .coverageLimit(BigDecimal.valueOf(1500000))
                        .cashlessHospitals(8400)
                        .claimSettlementRatio(98.4)
                        .waitingPeriod("24 months (PED)")
                        .deductible(0)
                        .description("All-inclusive medical protection covering hospitalization, critical illnesses, daycare treatments with zero room rent cap.")
                        .features("Zero Room Rent Sub-limits;;Pre & Post Hospitalization (60/180 days);;Free Annual Health Check-ups;;No Claim Bonus up to 100%")
                        .exclusions("Pre-existing diseases 24-month waiting period;;Cosmetic surgeries;;Self-inflicted injuries")
                        .popular(true)
                        .active(true)
                        .build(),

                InsurancePlan.builder()
                        .name("Optima Secure Family Floater")
                        .category("Health")
                        .insurerName("HDFC ERGO")
                        .rating(4.9)
                        .reviewsCount(2890)
                        .basePremium(BigDecimal.valueOf(11200))
                        .coverageLimit(BigDecimal.valueOf(2500000))
                        .cashlessHospitals(11000)
                        .claimSettlementRatio(99.1)
                        .waitingPeriod("30 days (illness)")
                        .deductible(0)
                        .description("Double the coverage from day one. Perfect for families with comprehensive maternity and OPD add-on.")
                        .features("2X Coverage from Day 1;;Unlimited Reinstatement of Sum Insured;;Maternity & Newborn Cover;;Worldwide Emergency Evacuation")
                        .exclusions("First 30 days illness (except accidents);;Experimental treatments;;Dental (unless accidental)")
                        .popular(true)
                        .active(true)
                        .build(),

                InsurancePlan.builder()
                        .name("DriveProtect Comprehensive Motor")
                        .category("Motor")
                        .insurerName("ICICI Lombard")
                        .rating(4.7)
                        .reviewsCount(1520)
                        .basePremium(BigDecimal.valueOf(4899))
                        .coverageLimit(BigDecimal.valueOf(850000))
                        .cashlessHospitals(7500)
                        .claimSettlementRatio(97.8)
                        .waitingPeriod("N/A")
                        .deductible(1000)
                        .description("Bumper-to-bumper zero-depreciation cover with rapid 24x7 on-road assistance.")
                        .features("Zero Depreciation Add-on;;24x7 Roadside Assistance;;Engine Protection;;Personal Accident Cover ₹15L")
                        .exclusions("Normal wear and tear;;Driving under influence;;Consequential damages")
                        .popular(false)
                        .active(true)
                        .build(),

                InsurancePlan.builder()
                        .name("MotoShield 360 Plus")
                        .category("Motor")
                        .insurerName("Tata AIG")
                        .rating(4.6)
                        .reviewsCount(980)
                        .basePremium(BigDecimal.valueOf(5499))
                        .coverageLimit(BigDecimal.valueOf(1200000))
                        .cashlessHospitals(6800)
                        .claimSettlementRatio(98.2)
                        .waitingPeriod("N/A")
                        .deductible(1500)
                        .description("Enhanced bumper protection with key replacement and return to invoice value.")
                        .features("Return to Invoice Cover;;Key & Lock Replacement ₹25K;;Consumables & Tyre Secure;;Instant Cashless Settlement")
                        .exclusions("Commercial usage of private vehicle;;Outside geographical limits;;Unlicensed driving")
                        .popular(false)
                        .active(true)
                        .build(),

                InsurancePlan.builder()
                        .name("SafeHaven Home & Content Secure")
                        .category("Home")
                        .insurerName("Bajaj Allianz")
                        .rating(4.8)
                        .reviewsCount(640)
                        .basePremium(BigDecimal.valueOf(2999))
                        .coverageLimit(BigDecimal.valueOf(4500000))
                        .cashlessHospitals(0)
                        .claimSettlementRatio(96.5)
                        .waitingPeriod("N/A")
                        .deductible(5000)
                        .description("Total structure and contents shield against fire, earthquakes, burglary, and electrical short circuits.")
                        .features("Building Structure Cover;;Valuable Content & Electronics;;Alternative Accommodation;;Public Liability")
                        .exclusions("Willful destruction;;War, terrorism, nuclear risks;;Pre-existing structural defects")
                        .popular(false)
                        .active(true)
                        .build(),

                InsurancePlan.builder()
                        .name("GlobeTrekker International Travel")
                        .category("Travel")
                        .insurerName("Reliance General")
                        .rating(4.5)
                        .reviewsCount(810)
                        .basePremium(BigDecimal.valueOf(1499))
                        .coverageLimit(BigDecimal.valueOf(3500000))
                        .cashlessHospitals(5200)
                        .claimSettlementRatio(95.8)
                        .waitingPeriod("N/A")
                        .deductible(0)
                        .description("International travel covering medical emergencies, passport loss, luggage delay, and flight cancellations.")
                        .features("Overseas Emergency Medical;;Trip Cancellation & Delay;;Loss of Baggage & Passport;;Emergency Cash Advance")
                        .exclusions("Traveling against medical advice;;Hazardous extreme sports;;Unattended luggage loss")
                        .popular(false)
                        .active(true)
                        .build(),

                InsurancePlan.builder()
                        .name("LifeGuard Pure Term 1 Crore")
                        .category("Life")
                        .insurerName("Max Life Insurance")
                        .rating(4.9)
                        .reviewsCount(3400)
                        .basePremium(BigDecimal.valueOf(9800))
                        .coverageLimit(BigDecimal.valueOf(10000000))
                        .cashlessHospitals(0)
                        .claimSettlementRatio(99.5)
                        .waitingPeriod("12 months (suicide)")
                        .deductible(0)
                        .description("High sum assured at affordable premiums with critical illness & accidental disability rider.")
                        .features("₹1 Crore Sum Assured;;Critical Illness Benefit (40 diseases);;Waiver of Premium on Disability;;Tax Benefits under Sec 80C")
                        .exclusions("Suicide within 12 months;;Criminal acts;;Undisclosed pre-existing terminal conditions")
                        .popular(true)
                        .active(true)
                        .build(),

                InsurancePlan.builder()
                        .name("BizShield SME Liability & Property")
                        .category("Business")
                        .insurerName("SBI General")
                        .rating(4.6)
                        .reviewsCount(520)
                        .basePremium(BigDecimal.valueOf(14500))
                        .coverageLimit(BigDecimal.valueOf(7500000))
                        .cashlessHospitals(0)
                        .claimSettlementRatio(96.2)
                        .waitingPeriod("N/A")
                        .deductible(10000)
                        .description("Safeguard your office, inventory, machinery, and legal liabilities with customized commercial coverage.")
                        .features("Office Premises & Inventory;;Commercial General Liability;;Cyber Threat Recovery;;Business Interruption")
                        .exclusions("Pollution and contamination;;Government fines;;Professional confidentiality breach")
                        .popular(false)
                        .active(true)
                        .build()
        );

        planRepository.saveAll(initialPlans);
        log.info("Seeded {} insurance plans into database", initialPlans.size());
    }

    private void seedClaims() {
        if (claimRepository.count() > 0) return;

        List<Claim> initialClaims = List.of(
                Claim.builder()
                        .claimNumber("CLM-2026-4521")
                        .policyNumber("POL-2026-98124")
                        .planName("CareShield Comprehensive Health")
                        .insurerName("Star Health Care")
                        .claimType("Cashless Hospitalization")
                        .amountClaimed(BigDecimal.valueOf(45000))
                        .amountApproved(BigDecimal.valueOf(42000))
                        .status(ClaimStatus.UNDER_REVIEW)
                        .submittedDate(LocalDate.now().minusDays(10))
                        .lastUpdated(LocalDate.now().minusDays(6))
                        .description("Hospitalization for appendectomy surgery at Apollo Hospital.")
                        .adminRemarks("Hospital discharge invoice and pharmacy bills under verification by medical auditor.")
                        .customerEmail("demo@insurehub.com")
                        .customerName("Demo Customer")
                        .documents("Discharge Summary,Hospital Bills,Lab Reports")
                        .build()
        );

        claimRepository.saveAll(initialClaims);
        log.info("Seeded {} initial claims into database", initialClaims.size());
    }
}
