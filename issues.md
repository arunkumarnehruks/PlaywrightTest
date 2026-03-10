Document the findings

1. What is the current workflow for US?
    We are validating en_US by first scraping the details from the specific preview server and store it in the database. Then executing a transient script which is collecting data from the spreadsheet and validates it against data stored in db.
2. What is the current workflow for Geos?
    As part of the 1st workflow, once the en_US is validated against the spreadsheet; We scrape data from all the preview servers for en_US again as well as all the Geos in scope. Where en_US scrapped data is translated and used as the baseline/ source of truth against the content available for all the Geos. 
3. Include the following in the workflow details: 
    1. When does the PM or Producer lets us know that build is ready?
        This is an incremental process where Producer informs regarding the tentative timeline with a detailed schedule but the build readiness details is shared on the day when we are suppose to start testing with a definite timeline for the same.
    2. How often the build gets updated? In turn how often we have to run the automation?
        We run automation in batches for the locales. i.e. One batch for the zh locales, one batch for European countries and one for all updates on any locales and Once at the last as part of regression. 
        Short Answer: 5-6 Times (Specifically for this release)
        https://a1450554.slack.com/archives/C0A9ZH1GTD5/p1770768003406979
    3. What are the issues filed in this Jan-Feb’26 release?<Issues are filed as per old process>
        The issues filed can be found in the following slack threads https://a1450554.slack.com/archives/C0A9ZH1GTD5/p1769553694070359 
        https://a1450554.slack.com/archives/C0A9ZH1GTD5/p1771023805965219
        https://a1450554.slack.com/archives/C0A9ZH1GTD5/p1771023814762049
    4. Is there any expected turn around time from QE/Kurt?
        We are not aware at this point 
    5. How are the updates communicated to us? 
        The information is communicated to us using BOX where we receive the source of truth by the producers as well as in slack channels where we are kept updated on details regarding batches and when we can start testing any of the specific locale’s.
4. What worked for us well in this first round?
    1. Connects with Evan were extremely informative and he made sure we could have all the details as it is passed on to him.
    2. We were able to match each and every step as well as replicate the results Evan was getting. 
    3. We were also able to actively execute all the tests and have pragmatic pairing with Evan and face the challenges firsthand.
5. What did not work for us in this first round?
    1. We only were able to connect with Evan and not much with the producers. We would like to setup some time with the producers to have a different perspective of the process side.
    2. We were having discussions only with Evan and validating his results with ours. There could be something else that we might be missing which will be discussed with Evan eventually.
    3. There is a lot of context Evan carries based on his experience which are not available anywhere in written. He has converted them into test automation logic as much as possible.
6. What are the challenges with current automation (Apple Farmer), if any?
    1. We are executing tests on safari which allows for only 1 browser instance at a time which is taking a lot of time, we could shift to Chromium services to have better time of execution.
    2. Locales are handled as page_id’s which is not a regular term known in Marcom, we could actually directly used the locale_codes directly as used in geo.iapps.apple.com to bring in a consistency.
    3. You need to make numerous minor code changes in multiple files to customise the test executions. No centralised approach or config.
    4. There are 4 steps which have to be executed individually there is no fallback mechanism or soft assertions, we could make the execution a bit more coupled to have a one go execution result.
    5. Documentation also needs to be updated otherwise it might be challenging for any new person to be able to execute tests without any help.
    6. Evan is yet to share with us the list of known issues with the current test framework 
    7. Some enhancements needed are - 
    1. Make the necessary changes such that the tests can be executed on any browser to run in parallel
    2. Auth flow would need an update if #7.a to be achieved
    3. Add tests to cover sosumi and footnote validation
    4. First step of the testing process needs to be automated. Currently framework needs some filtering of content as an input for it to process instead not the original document as it is.
7. Can we reuse the existing Apple Farmer as-is for next NPI?
    Apple Farmer can be re-used but we would surely need to make some changes to make it a bit more user friendly as currently the whole repo is being used by an individual only, which involves lot to minor code tweaks here and there for customised execution which will be a tedious task to document and creates lot of knowledge silos if those the parameters are not centralised.
8. What is being validated? Please describe or list scenarios to be validated.
    Please refer to section to the following section assess_section.py's Role: The Validation Engine: Understanding Apple Farmer.
    1. Validating en_US against the copydesk provided (Spreadsheet validation)
    2. Validating en_US validated baseline against other locales for content coherence post translation.
9. Do we have clarity on scope? 
    While Geos are provided as part of each batch execution but there is no exact list of locale code we could retrieve for the locale_codes that are not getting the product. Due to which we saw numerous errors, while the initial perception was all 108 (105 active) locales are going live with the update but later we realised that only 50+ locales were in scope. We understood from Evan that the source of such information is not in a centralised or a single source document.
10. How long it takes to run the automation? 
    [Note: Time period is highly subjective to the loading speed of the preview server and generally tad slower for offshore (Hyderabad) due to VPN tunnelling. Also there can be multiple errors due to page not loading/ section mismatch/ 404 for specific pages/ hitting rate limits. The below answer is considering code tweaks and environment is properly setup and there are no environment/ external issues]
    
    While executing for en_US only and then validating against a copydesk it takes around an hour
    Validating for a batch 4-5 locales can range somewhere between 30 minutes to 1 hour. 
    While validation for all the locales takes us around 5-6 hours 
11. How long it takes to analyze the results?
    This is subjective and generally we need more time during the initial period to analyse reports as errors are new and we need to filter out false errors carefully, which might be due to AI’s hallucinations or translation contextual errors.
12. If we were to rewrite automation, what is the LoE?
    The framework captures lot of nuances about the process and fallback for the issues noticed by Evan. The framework has evolved more around Evan’s ways of working.
    LoE: Need to analyse on the same
